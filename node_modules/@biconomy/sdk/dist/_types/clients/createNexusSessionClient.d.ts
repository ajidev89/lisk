import type { Address } from "viem";
import { type NexusClientConfig } from "./createNexusClient";
export type NexusSessionClientConfig = NexusClientConfig & {
    accountAddress: Address;
};
export declare const createNexusSessionClient: (parameters: NexusSessionClientConfig) => Promise<import("./createNexusClient").NexusClient<import("viem").Transport, import("viem").Chain | undefined, {
    getCounterFactualAddress: () => Promise<Address>;
    isDeployed: () => Promise<boolean>;
    getInitCode: () => import("viem").Hex;
    encodeExecute: (call: import("..").Call) => Promise<import("viem").Hex>;
    encodeExecuteBatch: (calls: readonly import("..").Call[]) => Promise<import("viem").Hex>;
    getUserOpHash: (userOp: Partial<import("..").UserOperationStruct>) => Promise<import("viem").Hex>;
    setModule: (validationModule: import("..").Module) => void;
    getModule: () => import("..").Module;
    factoryData: import("viem").Hex;
    factoryAddress: Address;
    signer: import("..").Signer;
    publicClient: import("viem").PublicClient;
    walletClient: import("viem").WalletClient;
    client: import("viem").Client;
    entryPoint: {
        abi: readonly [{
            readonly inputs: readonly [{
                readonly internalType: "bool";
                readonly name: "success";
                readonly type: "bool";
            }, {
                readonly internalType: "bytes";
                readonly name: "ret";
                readonly type: "bytes";
            }];
            readonly name: "DelegateAndRevert";
            readonly type: "error";
        }, {
            readonly inputs: readonly [{
                readonly internalType: "uint256";
                readonly name: "opIndex";
                readonly type: "uint256";
            }, {
                readonly internalType: "string";
                readonly name: "reason";
                readonly type: "string";
            }];
            readonly name: "FailedOp";
            readonly type: "error";
        }, {
            readonly inputs: readonly [{
                readonly internalType: "uint256";
                readonly name: "opIndex";
                readonly type: "uint256";
            }, {
                readonly internalType: "string";
                readonly name: "reason";
                readonly type: "string";
            }, {
                readonly internalType: "bytes";
                readonly name: "inner";
                readonly type: "bytes";
            }];
            readonly name: "FailedOpWithRevert";
            readonly type: "error";
        }, {
            readonly inputs: readonly [{
                readonly internalType: "bytes";
                readonly name: "returnData";
                readonly type: "bytes";
            }];
            readonly name: "PostOpReverted";
            readonly type: "error";
        }, {
            readonly inputs: readonly [];
            readonly name: "ReentrancyGuardReentrantCall";
            readonly type: "error";
        }, {
            readonly inputs: readonly [{
                readonly internalType: "address";
                readonly name: "sender";
                readonly type: "address";
            }];
            readonly name: "SenderAddressResult";
            readonly type: "error";
        }, {
            readonly inputs: readonly [{
                readonly internalType: "address";
                readonly name: "aggregator";
                readonly type: "address";
            }];
            readonly name: "SignatureValidationFailed";
            readonly type: "error";
        }, {
            readonly anonymous: false;
            readonly inputs: readonly [{
                readonly indexed: true;
                readonly internalType: "bytes32";
                readonly name: "userOpHash";
                readonly type: "bytes32";
            }, {
                readonly indexed: true;
                readonly internalType: "address";
                readonly name: "sender";
                readonly type: "address";
            }, {
                readonly indexed: false;
                readonly internalType: "address";
                readonly name: "factory";
                readonly type: "address";
            }, {
                readonly indexed: false;
                readonly internalType: "address";
                readonly name: "paymaster";
                readonly type: "address";
            }];
            readonly name: "AccountDeployed";
            readonly type: "event";
        }, {
            readonly anonymous: false;
            readonly inputs: readonly [];
            readonly name: "BeforeExecution";
            readonly type: "event";
        }, {
            readonly anonymous: false;
            readonly inputs: readonly [{
                readonly indexed: true;
                readonly internalType: "address";
                readonly name: "account";
                readonly type: "address";
            }, {
                readonly indexed: false;
                readonly internalType: "uint256";
                readonly name: "totalDeposit";
                readonly type: "uint256";
            }];
            readonly name: "Deposited";
            readonly type: "event";
        }, {
            readonly anonymous: false;
            readonly inputs: readonly [{
                readonly indexed: true;
                readonly internalType: "bytes32";
                readonly name: "userOpHash";
                readonly type: "bytes32";
            }, {
                readonly indexed: true;
                readonly internalType: "address";
                readonly name: "sender";
                readonly type: "address";
            }, {
                readonly indexed: false;
                readonly internalType: "uint256";
                readonly name: "nonce";
                readonly type: "uint256";
            }, {
                readonly indexed: false;
                readonly internalType: "bytes";
                readonly name: "revertReason";
                readonly type: "bytes";
            }];
            readonly name: "PostOpRevertReason";
            readonly type: "event";
        }, {
            readonly anonymous: false;
            readonly inputs: readonly [{
                readonly indexed: true;
                readonly internalType: "address";
                readonly name: "aggregator";
                readonly type: "address";
            }];
            readonly name: "SignatureAggregatorChanged";
            readonly type: "event";
        }, {
            readonly anonymous: false;
            readonly inputs: readonly [{
                readonly indexed: true;
                readonly internalType: "address";
                readonly name: "account";
                readonly type: "address";
            }, {
                readonly indexed: false;
                readonly internalType: "uint256";
                readonly name: "totalStaked";
                readonly type: "uint256";
            }, {
                readonly indexed: false;
                readonly internalType: "uint256";
                readonly name: "unstakeDelaySec";
                readonly type: "uint256";
            }];
            readonly name: "StakeLocked";
            readonly type: "event";
        }, {
            readonly anonymous: false;
            readonly inputs: readonly [{
                readonly indexed: true;
                readonly internalType: "address";
                readonly name: "account";
                readonly type: "address";
            }, {
                readonly indexed: false;
                readonly internalType: "uint256";
                readonly name: "withdrawTime";
                readonly type: "uint256";
            }];
            readonly name: "StakeUnlocked";
            readonly type: "event";
        }, {
            readonly anonymous: false;
            readonly inputs: readonly [{
                readonly indexed: true;
                readonly internalType: "address";
                readonly name: "account";
                readonly type: "address";
            }, {
                readonly indexed: false;
                readonly internalType: "address";
                readonly name: "withdrawAddress";
                readonly type: "address";
            }, {
                readonly indexed: false;
                readonly internalType: "uint256";
                readonly name: "amount";
                readonly type: "uint256";
            }];
            readonly name: "StakeWithdrawn";
            readonly type: "event";
        }, {
            readonly anonymous: false;
            readonly inputs: readonly [{
                readonly indexed: true;
                readonly internalType: "bytes32";
                readonly name: "userOpHash";
                readonly type: "bytes32";
            }, {
                readonly indexed: true;
                readonly internalType: "address";
                readonly name: "sender";
                readonly type: "address";
            }, {
                readonly indexed: true;
                readonly internalType: "address";
                readonly name: "paymaster";
                readonly type: "address";
            }, {
                readonly indexed: false;
                readonly internalType: "uint256";
                readonly name: "nonce";
                readonly type: "uint256";
            }, {
                readonly indexed: false;
                readonly internalType: "bool";
                readonly name: "success";
                readonly type: "bool";
            }, {
                readonly indexed: false;
                readonly internalType: "uint256";
                readonly name: "actualGasCost";
                readonly type: "uint256";
            }, {
                readonly indexed: false;
                readonly internalType: "uint256";
                readonly name: "actualGasUsed";
                readonly type: "uint256";
            }];
            readonly name: "UserOperationEvent";
            readonly type: "event";
        }, {
            readonly anonymous: false;
            readonly inputs: readonly [{
                readonly indexed: true;
                readonly internalType: "bytes32";
                readonly name: "userOpHash";
                readonly type: "bytes32";
            }, {
                readonly indexed: true;
                readonly internalType: "address";
                readonly name: "sender";
                readonly type: "address";
            }, {
                readonly indexed: false;
                readonly internalType: "uint256";
                readonly name: "nonce";
                readonly type: "uint256";
            }];
            readonly name: "UserOperationPrefundTooLow";
            readonly type: "event";
        }, {
            readonly anonymous: false;
            readonly inputs: readonly [{
                readonly indexed: true;
                readonly internalType: "bytes32";
                readonly name: "userOpHash";
                readonly type: "bytes32";
            }, {
                readonly indexed: true;
                readonly internalType: "address";
                readonly name: "sender";
                readonly type: "address";
            }, {
                readonly indexed: false;
                readonly internalType: "uint256";
                readonly name: "nonce";
                readonly type: "uint256";
            }, {
                readonly indexed: false;
                readonly internalType: "bytes";
                readonly name: "revertReason";
                readonly type: "bytes";
            }];
            readonly name: "UserOperationRevertReason";
            readonly type: "event";
        }, {
            readonly anonymous: false;
            readonly inputs: readonly [{
                readonly indexed: true;
                readonly internalType: "address";
                readonly name: "account";
                readonly type: "address";
            }, {
                readonly indexed: false;
                readonly internalType: "address";
                readonly name: "withdrawAddress";
                readonly type: "address";
            }, {
                readonly indexed: false;
                readonly internalType: "uint256";
                readonly name: "amount";
                readonly type: "uint256";
            }];
            readonly name: "Withdrawn";
            readonly type: "event";
        }, {
            readonly inputs: readonly [{
                readonly internalType: "uint32";
                readonly name: "unstakeDelaySec";
                readonly type: "uint32";
            }];
            readonly name: "addStake";
            readonly outputs: readonly [];
            readonly stateMutability: "payable";
            readonly type: "function";
        }, {
            readonly inputs: readonly [{
                readonly internalType: "address";
                readonly name: "account";
                readonly type: "address";
            }];
            readonly name: "balanceOf";
            readonly outputs: readonly [{
                readonly internalType: "uint256";
                readonly name: "";
                readonly type: "uint256";
            }];
            readonly stateMutability: "view";
            readonly type: "function";
        }, {
            readonly inputs: readonly [{
                readonly internalType: "address";
                readonly name: "target";
                readonly type: "address";
            }, {
                readonly internalType: "bytes";
                readonly name: "data";
                readonly type: "bytes";
            }];
            readonly name: "delegateAndRevert";
            readonly outputs: readonly [];
            readonly stateMutability: "nonpayable";
            readonly type: "function";
        }, {
            readonly inputs: readonly [{
                readonly internalType: "address";
                readonly name: "account";
                readonly type: "address";
            }];
            readonly name: "depositTo";
            readonly outputs: readonly [];
            readonly stateMutability: "payable";
            readonly type: "function";
        }, {
            readonly inputs: readonly [{
                readonly internalType: "address";
                readonly name: "";
                readonly type: "address";
            }];
            readonly name: "deposits";
            readonly outputs: readonly [{
                readonly internalType: "uint256";
                readonly name: "deposit";
                readonly type: "uint256";
            }, {
                readonly internalType: "bool";
                readonly name: "staked";
                readonly type: "bool";
            }, {
                readonly internalType: "uint112";
                readonly name: "stake";
                readonly type: "uint112";
            }, {
                readonly internalType: "uint32";
                readonly name: "unstakeDelaySec";
                readonly type: "uint32";
            }, {
                readonly internalType: "uint48";
                readonly name: "withdrawTime";
                readonly type: "uint48";
            }];
            readonly stateMutability: "view";
            readonly type: "function";
        }, {
            readonly inputs: readonly [{
                readonly internalType: "address";
                readonly name: "account";
                readonly type: "address";
            }];
            readonly name: "getDepositInfo";
            readonly outputs: readonly [{
                readonly components: readonly [{
                    readonly internalType: "uint256";
                    readonly name: "deposit";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "bool";
                    readonly name: "staked";
                    readonly type: "bool";
                }, {
                    readonly internalType: "uint112";
                    readonly name: "stake";
                    readonly type: "uint112";
                }, {
                    readonly internalType: "uint32";
                    readonly name: "unstakeDelaySec";
                    readonly type: "uint32";
                }, {
                    readonly internalType: "uint48";
                    readonly name: "withdrawTime";
                    readonly type: "uint48";
                }];
                readonly internalType: "struct IStakeManager.DepositInfo";
                readonly name: "info";
                readonly type: "tuple";
            }];
            readonly stateMutability: "view";
            readonly type: "function";
        }, {
            readonly inputs: readonly [{
                readonly internalType: "address";
                readonly name: "sender";
                readonly type: "address";
            }, {
                readonly internalType: "uint192";
                readonly name: "key";
                readonly type: "uint192";
            }];
            readonly name: "getNonce";
            readonly outputs: readonly [{
                readonly internalType: "uint256";
                readonly name: "nonce";
                readonly type: "uint256";
            }];
            readonly stateMutability: "view";
            readonly type: "function";
        }, {
            readonly inputs: readonly [{
                readonly internalType: "bytes";
                readonly name: "initCode";
                readonly type: "bytes";
            }];
            readonly name: "getSenderAddress";
            readonly outputs: readonly [];
            readonly stateMutability: "nonpayable";
            readonly type: "function";
        }, {
            readonly inputs: readonly [{
                readonly components: readonly [{
                    readonly internalType: "address";
                    readonly name: "sender";
                    readonly type: "address";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "nonce";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "bytes";
                    readonly name: "initCode";
                    readonly type: "bytes";
                }, {
                    readonly internalType: "bytes";
                    readonly name: "callData";
                    readonly type: "bytes";
                }, {
                    readonly internalType: "bytes32";
                    readonly name: "accountGasLimits";
                    readonly type: "bytes32";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "preVerificationGas";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "bytes32";
                    readonly name: "gasFees";
                    readonly type: "bytes32";
                }, {
                    readonly internalType: "bytes";
                    readonly name: "paymasterAndData";
                    readonly type: "bytes";
                }, {
                    readonly internalType: "bytes";
                    readonly name: "signature";
                    readonly type: "bytes";
                }];
                readonly internalType: "struct PackedUserOperation";
                readonly name: "userOp";
                readonly type: "tuple";
            }];
            readonly name: "getUserOpHash";
            readonly outputs: readonly [{
                readonly internalType: "bytes32";
                readonly name: "";
                readonly type: "bytes32";
            }];
            readonly stateMutability: "view";
            readonly type: "function";
        }, {
            readonly inputs: readonly [{
                readonly components: readonly [{
                    readonly components: readonly [{
                        readonly internalType: "address";
                        readonly name: "sender";
                        readonly type: "address";
                    }, {
                        readonly internalType: "uint256";
                        readonly name: "nonce";
                        readonly type: "uint256";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "initCode";
                        readonly type: "bytes";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "callData";
                        readonly type: "bytes";
                    }, {
                        readonly internalType: "bytes32";
                        readonly name: "accountGasLimits";
                        readonly type: "bytes32";
                    }, {
                        readonly internalType: "uint256";
                        readonly name: "preVerificationGas";
                        readonly type: "uint256";
                    }, {
                        readonly internalType: "bytes32";
                        readonly name: "gasFees";
                        readonly type: "bytes32";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "paymasterAndData";
                        readonly type: "bytes";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "signature";
                        readonly type: "bytes";
                    }];
                    readonly internalType: "struct PackedUserOperation[]";
                    readonly name: "userOps";
                    readonly type: "tuple[]";
                }, {
                    readonly internalType: "contract IAggregator";
                    readonly name: "aggregator";
                    readonly type: "address";
                }, {
                    readonly internalType: "bytes";
                    readonly name: "signature";
                    readonly type: "bytes";
                }];
                readonly internalType: "struct IEntryPoint.UserOpsPerAggregator[]";
                readonly name: "opsPerAggregator";
                readonly type: "tuple[]";
            }, {
                readonly internalType: "address payable";
                readonly name: "beneficiary";
                readonly type: "address";
            }];
            readonly name: "handleAggregatedOps";
            readonly outputs: readonly [];
            readonly stateMutability: "nonpayable";
            readonly type: "function";
        }, {
            readonly inputs: readonly [{
                readonly components: readonly [{
                    readonly internalType: "address";
                    readonly name: "sender";
                    readonly type: "address";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "nonce";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "bytes";
                    readonly name: "initCode";
                    readonly type: "bytes";
                }, {
                    readonly internalType: "bytes";
                    readonly name: "callData";
                    readonly type: "bytes";
                }, {
                    readonly internalType: "bytes32";
                    readonly name: "accountGasLimits";
                    readonly type: "bytes32";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "preVerificationGas";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "bytes32";
                    readonly name: "gasFees";
                    readonly type: "bytes32";
                }, {
                    readonly internalType: "bytes";
                    readonly name: "paymasterAndData";
                    readonly type: "bytes";
                }, {
                    readonly internalType: "bytes";
                    readonly name: "signature";
                    readonly type: "bytes";
                }];
                readonly internalType: "struct PackedUserOperation[]";
                readonly name: "ops";
                readonly type: "tuple[]";
            }, {
                readonly internalType: "address payable";
                readonly name: "beneficiary";
                readonly type: "address";
            }];
            readonly name: "handleOps";
            readonly outputs: readonly [];
            readonly stateMutability: "nonpayable";
            readonly type: "function";
        }, {
            readonly inputs: readonly [{
                readonly internalType: "uint192";
                readonly name: "key";
                readonly type: "uint192";
            }];
            readonly name: "incrementNonce";
            readonly outputs: readonly [];
            readonly stateMutability: "nonpayable";
            readonly type: "function";
        }, {
            readonly inputs: readonly [{
                readonly internalType: "bytes";
                readonly name: "callData";
                readonly type: "bytes";
            }, {
                readonly components: readonly [{
                    readonly components: readonly [{
                        readonly internalType: "address";
                        readonly name: "sender";
                        readonly type: "address";
                    }, {
                        readonly internalType: "uint256";
                        readonly name: "nonce";
                        readonly type: "uint256";
                    }, {
                        readonly internalType: "uint256";
                        readonly name: "verificationGasLimit";
                        readonly type: "uint256";
                    }, {
                        readonly internalType: "uint256";
                        readonly name: "callGasLimit";
                        readonly type: "uint256";
                    }, {
                        readonly internalType: "uint256";
                        readonly name: "paymasterVerificationGasLimit";
                        readonly type: "uint256";
                    }, {
                        readonly internalType: "uint256";
                        readonly name: "paymasterPostOpGasLimit";
                        readonly type: "uint256";
                    }, {
                        readonly internalType: "uint256";
                        readonly name: "preVerificationGas";
                        readonly type: "uint256";
                    }, {
                        readonly internalType: "address";
                        readonly name: "paymaster";
                        readonly type: "address";
                    }, {
                        readonly internalType: "uint256";
                        readonly name: "maxFeePerGas";
                        readonly type: "uint256";
                    }, {
                        readonly internalType: "uint256";
                        readonly name: "maxPriorityFeePerGas";
                        readonly type: "uint256";
                    }];
                    readonly internalType: "struct EntryPoint.MemoryUserOp";
                    readonly name: "mUserOp";
                    readonly type: "tuple";
                }, {
                    readonly internalType: "bytes32";
                    readonly name: "userOpHash";
                    readonly type: "bytes32";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "prefund";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "contextOffset";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "preOpGas";
                    readonly type: "uint256";
                }];
                readonly internalType: "struct EntryPoint.UserOpInfo";
                readonly name: "opInfo";
                readonly type: "tuple";
            }, {
                readonly internalType: "bytes";
                readonly name: "context";
                readonly type: "bytes";
            }];
            readonly name: "innerHandleOp";
            readonly outputs: readonly [{
                readonly internalType: "uint256";
                readonly name: "actualGasCost";
                readonly type: "uint256";
            }];
            readonly stateMutability: "nonpayable";
            readonly type: "function";
        }, {
            readonly inputs: readonly [{
                readonly internalType: "address";
                readonly name: "";
                readonly type: "address";
            }, {
                readonly internalType: "uint192";
                readonly name: "";
                readonly type: "uint192";
            }];
            readonly name: "nonceSequenceNumber";
            readonly outputs: readonly [{
                readonly internalType: "uint256";
                readonly name: "";
                readonly type: "uint256";
            }];
            readonly stateMutability: "view";
            readonly type: "function";
        }, {
            readonly inputs: readonly [{
                readonly internalType: "bytes4";
                readonly name: "interfaceId";
                readonly type: "bytes4";
            }];
            readonly name: "supportsInterface";
            readonly outputs: readonly [{
                readonly internalType: "bool";
                readonly name: "";
                readonly type: "bool";
            }];
            readonly stateMutability: "view";
            readonly type: "function";
        }, {
            readonly inputs: readonly [];
            readonly name: "unlockStake";
            readonly outputs: readonly [];
            readonly stateMutability: "nonpayable";
            readonly type: "function";
        }, {
            readonly inputs: readonly [{
                readonly internalType: "address payable";
                readonly name: "withdrawAddress";
                readonly type: "address";
            }];
            readonly name: "withdrawStake";
            readonly outputs: readonly [];
            readonly stateMutability: "nonpayable";
            readonly type: "function";
        }, {
            readonly inputs: readonly [{
                readonly internalType: "address payable";
                readonly name: "withdrawAddress";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "withdrawAmount";
                readonly type: "uint256";
            }];
            readonly name: "withdrawTo";
            readonly outputs: readonly [];
            readonly stateMutability: "nonpayable";
            readonly type: "function";
        }, {
            readonly stateMutability: "payable";
            readonly type: "receive";
        }];
        address: Address;
        version: "0.7";
    };
    extend?: {
        getCounterFactualAddress: () => Promise<Address>;
        isDeployed: () => Promise<boolean>;
        getInitCode: () => import("viem").Hex;
        encodeExecute: (call: import("..").Call) => Promise<import("viem").Hex>;
        encodeExecuteBatch: (calls: readonly import("..").Call[]) => Promise<import("viem").Hex>;
        getUserOpHash: (userOp: Partial<import("..").UserOperationStruct>) => Promise<import("viem").Hex>;
        setModule: (validationModule: import("..").Module) => void;
        getModule: () => import("..").Module;
        factoryData: import("viem").Hex;
        factoryAddress: Address;
        signer: import("..").Signer;
        publicClient: import("viem").PublicClient;
        walletClient: import("viem").WalletClient;
    } | undefined;
    getAddress: () => Promise<Address>;
    encodeCalls: (calls: readonly {
        to: import("viem").Hex;
        data?: import("viem").Hex | undefined;
        value?: bigint | undefined;
    }[]) => Promise<import("viem").Hex>;
    getFactoryArgs: () => Promise<{
        factory?: Address | undefined;
        factoryData?: import("viem").Hex | undefined;
    }>;
    getNonce: (parameters?: {
        key?: bigint | undefined;
    } | undefined) => Promise<bigint>;
    getStubSignature: () => Promise<import("viem").Hex>;
    nonceKeyManager?: import("viem").NonceManager | undefined;
    sign?: ((parameters: {
        hash: import("viem").Hash;
    }) => Promise<import("viem").Hex>) | undefined;
    signMessage: (parameters: {
        message: import("viem").SignableMessage;
    }) => Promise<import("viem").Hex>;
    signTypedData: <const typedData extends import("viem").TypedData | Record<string, unknown>, primaryType extends keyof typedData | "EIP712Domain" = keyof typedData>(parameters: import("viem").TypedDataDefinition<typedData, primaryType>) => Promise<import("viem").Hex>;
    signUserOperation: (parameters: import("viem").UnionPartialBy<import("viem/_types/account-abstraction").UserOperation, "sender"> & {
        chainId?: number | undefined;
    }) => Promise<import("viem").Hex>;
    userOperation?: {
        estimateGas?: ((userOperation: import("viem/_types/account-abstraction").UserOperationRequest) => Promise<import("viem").ExactPartial<import("viem/_types/account-abstraction/types/userOperation").EstimateUserOperationGasReturnType> | undefined>) | undefined;
    } | undefined;
    address: Address;
    type: "smart";
} | undefined, import("viem").Client | undefined, undefined>>;
//# sourceMappingURL=createNexusSessionClient.d.ts.map