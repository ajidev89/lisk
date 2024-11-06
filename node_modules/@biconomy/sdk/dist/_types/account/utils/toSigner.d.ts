import { type Account, type Address, type Chain, type EIP1193Provider, type LocalAccount, type OneOf, type Transport, type WalletClient } from "viem";
export type MinimalSigner = {
    signTransaction: (...args: any[]) => Promise<any>;
    signMessage: (...args: any[]) => Promise<any>;
    signTypedData: (...args: any[]) => Promise<any>;
    getAddress?: () => Promise<any>;
    address?: any;
    provider?: any;
    [key: string]: any;
};
export type Signer = LocalAccount;
export type UnknownSigner = OneOf<EIP1193Provider | WalletClient<Transport, Chain | undefined, Account> | LocalAccount | Account | MinimalSigner>;
export declare function toSigner({ signer, address }: {
    signer: UnknownSigner & {
        getAddress: () => Promise<string>;
        signMessage: (message: any) => Promise<string>;
        signTypedData: (domain: any, types: any, value: any) => Promise<string>;
    };
    address?: Address;
}): Promise<LocalAccount>;
//# sourceMappingURL=toSigner.d.ts.map