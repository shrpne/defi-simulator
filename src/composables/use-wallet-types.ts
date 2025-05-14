import type { ComputedRef } from 'vue';

export type UseWallet = {
    isConnected: ComputedRef<boolean>;
    address: ComputedRef<`0x${string}` | undefined>;
    shortAddress: ComputedRef<string|''>;
    connectedChainId: ComputedRef<string | number | undefined>
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    switchChain: () => void;
}
