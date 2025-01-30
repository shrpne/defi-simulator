export type SimulateBundleResponse = {
    id: number;
    jsonrpc: string;
    result: SimulateBundleResult;
};

export type SimulateBundleResult = SimulateTransactionResult[];

export type SimulateTransactionResult = {
    status: boolean;
    gasUsed: string;
    cumulativeGasUsed: string;
    blockNumber: string;
    type: string;
    logsBloom: string;
    logs: Log[];
    trace: Trace[];
    assetChanges?: AssetChange[];
    balanceChanges?: BalanceChange[];
    stateChanges?: StateChange[];
};

type Log = {
    name: string;
    anonymous: boolean;
    inputs: Input[];
    raw: {
        address: string;
        topics: string[];
        data: string;
    };
};

type Input = {
    value: string;
    type: string;
    name: string;
    indexed: boolean;
};

type Trace = {
    type: string;
    from: string;
    to: string;
    gas: string;
    gasUsed: string;
    value: string;
    input: string;
    decodedInput?: Input[];
    method?: string;
    output: string;
    decodedOutput?: DecodedOutput[];
    subtraces: number;
    traceAddress: string[];
};

type DecodedOutput = {
    value: boolean | string;
    type: string;
    indexed: boolean;
};

export type AssetChange = {
    assetInfo: AssetInfo;
    type: string;
    to: string;
    from?: string;
    rawAmount: string;
    amount?: string;
    dollarValue?: string;
};

type AssetInfo = {
    standard: string;
    type?: string;
    contractAddress: string;
    symbol?: string;
    name?: string;
    logo?: string;
    decimals?: number;
    dollarValue?: string;
};

type BalanceChange = {
    address: string;
    dollarValue: string;
    transfers: number[];
};

type StateChange = {
    address: string;
    storage?: StorageChange[];
    nonce?: {
        previousValue: string;
        newValue: string;
    };
};

type StorageChange = {
    slot: string;
    previousValue: string;
    newValue: string;
};
