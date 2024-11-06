import { concat, concatHex, createPublicClient, createWalletClient, domainSeparator, encodeAbiParameters, encodeFunctionData, encodePacked, getContract, keccak256, parseAbi, parseAbiParameters, publicActions, toBytes, toHex, validateTypedData, zeroAddress } from "viem";
import { entryPoint07Address, getUserOperationHash, toSmartAccount } from "viem/account-abstraction";
import { EntrypointAbi, K1ValidatorFactoryAbi } from "../constants/abi/index.js";
import { ERROR_MESSAGES, EXECUTE_BATCH, EXECUTE_SINGLE, MAGIC_BYTES, PARENT_TYPEHASH } from "./utils/Constants.js";
import { ENTRY_POINT_ADDRESS, k1ValidatorAddress as k1ValidatorAddress_, k1ValidatorFactoryAddress } from "../constants/index.js";
import { toK1Validator } from "../modules/k1Validator/toK1Validator.js";
import { addressEquals, eip712WrapHash, getAccountDomainStructFields, getTypesForEIP712Domain, isNullOrUndefined, packUserOp, typeToString } from "./utils/Utils.js";
import { toSigner } from "./utils/toSigner.js";
/**
 * @description Create a Nexus Smart Account.
 *
 * @param parameters - {@link ToNexusSmartAccountParameters}
 * @returns Nexus Smart Account. {@link NexusAccount}
 *
 * @example
 * import { toNexusAccount } from '@biconomy/sdk'
 * import { createWalletClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 *
 * const account = await toNexusAccount({
 *   chain: mainnet,
 *   transport: http(),
 *   signer: '0x...',
 * })
 */
export const toNexusAccount = async (parameters) => {
    const { chain, transport, signer: _signer, index = 0n, module: module_, factoryAddress = k1ValidatorFactoryAddress, k1ValidatorAddress = k1ValidatorAddress_, key = "nexus account", name = "Nexus Account" } = parameters;
    // @ts-ignore
    const signer = await toSigner({ signer: _signer });
    const walletClient = createWalletClient({
        account: signer,
        chain,
        transport,
        key,
        name
    }).extend(publicActions);
    const publicClient = createPublicClient({
        chain,
        transport
    });
    const signerAddress = walletClient.account.address;
    const entryPointContract = getContract({
        address: ENTRY_POINT_ADDRESS,
        abi: EntrypointAbi,
        client: {
            public: publicClient,
            wallet: walletClient
        }
    });
    const factoryData = encodeFunctionData({
        abi: K1ValidatorFactoryAbi,
        functionName: "createAccount",
        args: [signerAddress, index, [], 0]
    });
    let _accountAddress = parameters.accountAddress;
    /**
     * @description Gets the address of the account
     * @returns The address of the account
     */
    const getAddress = async () => {
        if (!isNullOrUndefined(_accountAddress))
            return _accountAddress;
        try {
            _accountAddress = (await publicClient.readContract({
                address: factoryAddress,
                abi: K1ValidatorFactoryAbi,
                functionName: "computeAccountAddress",
                args: [signerAddress, index, [], 0]
            }));
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        }
        catch (e) {
            if (e.shortMessage?.includes(ERROR_MESSAGES.MISSING_ACCOUNT_CONTRACT)) {
                throw new Error(ERROR_MESSAGES.FAILED_COMPUTE_ACCOUNT_ADDRESS);
            }
            throw e;
        }
        return _accountAddress;
    };
    /**
     * @description Gets the init code for the account
     * @returns The init code as a hexadecimal string
     */
    const getInitCode = () => concatHex([factoryAddress, factoryData]);
    /**
     * @description Gets the counterfactual address of the account
     * @returns The counterfactual address
     * @throws {Error} If unable to get the counterfactual address
     */
    const getCounterFactualAddress = async () => {
        if (_accountAddress)
            return _accountAddress;
        try {
            await entryPointContract.simulate.getSenderAddress([getInitCode()]);
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        }
        catch (e) {
            if (e?.cause?.data?.errorName === "SenderAddressResult") {
                _accountAddress = e?.cause.data.args[0];
                if (!addressEquals(_accountAddress, zeroAddress)) {
                    return _accountAddress;
                }
            }
        }
        throw new Error("Failed to get counterfactual account address");
    };
    let module = module_ ??
        toK1Validator({
            address: k1ValidatorAddress,
            accountAddress: await getCounterFactualAddress(),
            initData: signerAddress,
            deInitData: "0x",
            signer
        });
    /**
     * @description Checks if the account is deployed
     * @returns True if the account is deployed, false otherwise
     */
    const isDeployed = async () => {
        const address = await getCounterFactualAddress();
        const contractCode = await publicClient.getCode({ address });
        return (contractCode?.length ?? 0) > 2;
    };
    /**
     * @description Calculates the hash of a user operation
     * @param userOp - The user operation
     * @returns The hash of the user operation
     */
    const getUserOpHash = async (userOp) => {
        const packedUserOp = packUserOp(userOp);
        const userOpHash = keccak256(packedUserOp);
        const enc = encodeAbiParameters(parseAbiParameters("bytes32, address, uint256"), [userOpHash, ENTRY_POINT_ADDRESS, BigInt(chain.id)]);
        return keccak256(enc);
    };
    /**
     * @description Encodes a batch of calls for execution
     * @param calls - An array of calls to encode
     * @param mode - The execution mode
     * @returns The encoded calls
     */
    const encodeExecuteBatch = async (calls, mode = EXECUTE_BATCH) => {
        const executionAbiParams = {
            type: "tuple[]",
            components: [
                { name: "target", type: "address" },
                { name: "value", type: "uint256" },
                { name: "callData", type: "bytes" }
            ]
        };
        const executions = calls.map((tx) => ({
            target: tx.to,
            callData: tx.data ?? "0x",
            value: BigInt(tx.value ?? 0n)
        }));
        const executionCalldataPrep = encodeAbiParameters([executionAbiParams], [executions]);
        return encodeFunctionData({
            abi: parseAbi([
                "function execute(bytes32 mode, bytes calldata executionCalldata) external"
            ]),
            functionName: "execute",
            args: [mode, executionCalldataPrep]
        });
    };
    /**
     * @description Encodes a single call for execution
     * @param call - The call to encode
     * @param mode - The execution mode
     * @returns The encoded call
     */
    const encodeExecute = async (call, mode = EXECUTE_SINGLE) => {
        const executionCalldata = encodePacked(["address", "uint256", "bytes"], [call.to, BigInt(call.value ?? 0n), (call.data ?? "0x")]);
        return encodeFunctionData({
            abi: parseAbi([
                "function execute(bytes32 mode, bytes calldata executionCalldata) external"
            ]),
            functionName: "execute",
            args: [mode, executionCalldata]
        });
    };
    /**
     * @description Gets the nonce for the account
     * @param args - Optional arguments for getting the nonce
     * @returns The nonce
     */
    const getNonce = async (parameters) => {
        try {
            const TIMESTAMP_ADJUSTMENT = 16777215n;
            const defaultedKey = BigInt(parameters?.key ?? 0n) % TIMESTAMP_ADJUSTMENT;
            const defaultedValidationMode = parameters?.validationMode ?? "0x00";
            const key = concat([
                toHex(defaultedKey, { size: 3 }),
                defaultedValidationMode,
                module.address
            ]);
            const accountAddress = await getAddress();
            return await entryPointContract.read.getNonce([
                accountAddress,
                BigInt(key)
            ]);
        }
        catch (e) {
            return 0n;
        }
    };
    /**
     * @description Changes the active module for the account
     * @param module - The new module to set as active
     * @returns void
     */
    const setModule = (validationModule) => {
        module = validationModule;
    };
    /**
     * @description Signs a message
     * @param params - The parameters for signing
     * @param params.message - The message to sign
     * @returns The signature
     */
    const signMessage = async ({ message }) => {
        const tempSignature = await module.signMessage(message);
        const signature = encodePacked(["address", "bytes"], [module.address, tempSignature]);
        const erc6492Signature = concat([
            encodeAbiParameters([
                {
                    type: "address",
                    name: "create2Factory"
                },
                {
                    type: "bytes",
                    name: "factoryCalldata"
                },
                {
                    type: "bytes",
                    name: "originalERC1271Signature"
                }
            ], [factoryAddress, factoryData, signature]),
            MAGIC_BYTES
        ]);
        const accountIsDeployed = await isDeployed();
        return accountIsDeployed ? signature : erc6492Signature;
    };
    /**
     * @description Signs typed data
     * @param parameters - The typed data parameters
     * @returns The signature
     */
    async function signTypedData(parameters) {
        const { message, primaryType, types: _types, domain } = parameters;
        if (!domain)
            throw new Error("Missing domain");
        if (!message)
            throw new Error("Missing message");
        const types = {
            EIP712Domain: getTypesForEIP712Domain({ domain }),
            ..._types
        };
        // @ts-ignore: Comes from nexus parent typehash
        const messageStuff = message.stuff;
        // @ts-ignore
        validateTypedData({
            domain,
            message,
            primaryType,
            types
        });
        const appDomainSeparator = domainSeparator({ domain });
        const accountDomainStructFields = await getAccountDomainStructFields(publicClient, await getAddress());
        const parentStructHash = keccak256(encodePacked(["bytes", "bytes"], [
            encodeAbiParameters(parseAbiParameters(["bytes32, bytes32"]), [
                keccak256(toBytes(PARENT_TYPEHASH)),
                messageStuff
            ]),
            accountDomainStructFields
        ]));
        const wrappedTypedHash = eip712WrapHash(parentStructHash, appDomainSeparator);
        let signature = await module.signMessage({ raw: toBytes(wrappedTypedHash) });
        const contentsType = toBytes(typeToString(types)[1]);
        const signatureData = concatHex([
            signature,
            appDomainSeparator,
            messageStuff,
            toHex(contentsType),
            toHex(contentsType.length, { size: 2 })
        ]);
        signature = encodePacked(["address", "bytes"], [module.address, signatureData]);
        return signature;
    }
    return toSmartAccount({
        client: walletClient,
        entryPoint: {
            abi: EntrypointAbi,
            address: ENTRY_POINT_ADDRESS,
            version: "0.7"
        },
        getAddress,
        encodeCalls: (calls) => {
            return calls.length === 1
                ? encodeExecute(calls[0])
                : encodeExecuteBatch(calls);
        },
        getFactoryArgs: async () => ({ factory: factoryAddress, factoryData }),
        getStubSignature: async () => module.getStubSignature(),
        signMessage,
        signTypedData,
        signUserOperation: async (parameters) => {
            const { chainId = publicClient.chain.id, ...userOpWithoutSender } = parameters;
            const address = await getCounterFactualAddress();
            const userOperation = {
                ...userOpWithoutSender,
                sender: address
            };
            const hash = getUserOperationHash({
                chainId,
                entryPointAddress: entryPoint07Address,
                entryPointVersion: "0.7",
                userOperation
            });
            return await module.signUserOpHash(hash);
        },
        getNonce,
        extend: {
            entryPointAddress: entryPoint07Address,
            getCounterFactualAddress,
            isDeployed,
            getInitCode,
            encodeExecute,
            encodeExecuteBatch,
            getUserOpHash,
            setModule,
            getModule: () => module,
            factoryData,
            factoryAddress,
            signer,
            walletClient,
            publicClient
        }
    });
};
//# sourceMappingURL=toNexusAccount.js.map