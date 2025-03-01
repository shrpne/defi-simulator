export type { TokenValue, TokenInfo } from '@/composables/use-tokens.ts';

import type { TokenValue } from '@/composables/use-tokens.ts';

export type EstimationStep = {
    name: string,
    gas: number,
    receive: TokenValue,
}
