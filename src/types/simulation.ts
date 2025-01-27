export type SimulationResponse = {
    id: number;
    jsonrpc: string;
    result: Array<{
        status: boolean;
        gasUsed: string;
        cumulativeGasUsed: string;
        blockNumber: string;
        type: string;
        logsBloom: string;
        logs: Array<{
            name: string;
            anonymous: boolean;
            inputs: Array<{
                value: string;
                type: string;
                name: string;
                indexed: boolean;
            }>;
            raw: {
                address: string;
                topics: string[];
                data: string;
            };
        }>;
        assetChanges?: Array<{
            assetInfo: {
                standard: string;
                type?: string;
                contractAddress: string;
                symbol?: string;
                name?: string;
                logo?: string;
                decimals?: number;
                dollarValue?: string;
            };
            type: 'Approve' | 'Transfer';
            owner?: string;
            spender?: string;
            from: string;
            to: string;
            rawAmount: string;
            amount?: string;
            dollarValue: string;
        }>;
        stateChanges: Array<{
            address: string;
            nonce?: {
                previousValue: string;
                newValue: string;
            };
            storage?: Array<{
                slot: string;
                previousValue: string;
                newValue: string;
            }>;
        }>;
    }>;
};
