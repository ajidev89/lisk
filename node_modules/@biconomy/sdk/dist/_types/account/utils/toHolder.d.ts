import { type Account, type Address, type Chain, type EIP1193Provider, type LocalAccount, type OneOf, type Transport, type WalletClient } from "viem";
export type Holder = LocalAccount;
export type UnknownHolder = OneOf<EIP1193Provider | WalletClient<Transport, Chain | undefined, Account> | LocalAccount>;
export declare function toHolder({ holder, address }: {
    holder: UnknownHolder;
    address?: Address;
}): Promise<LocalAccount>;
//# sourceMappingURL=toHolder.d.ts.map