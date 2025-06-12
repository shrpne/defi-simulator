/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface PendlePtYtImpliedYieldChangeAmountResponse {
  ptMovementUpUsd?: number;
  ptMovementDownUsd?: number;
  ytMovementUpUsd?: number;
  ytMovementDownUsd?: number;
}

export interface PendleYieldRangeResponse {
  min: number;
  max: number;
}

export interface PendleMarketDetails {
  /**
   * market liquidity in USD
   * @example 1234567.89
   */
  liquidity: number;
  /**
   * APY from Pendle rewards
   * @example 0.456
   */
  pendleApy: number;
  /**
   * implied APY of market
   * @example 0.123
   */
  impliedApy: number;
  /**
   * market fee rate
   * @example 0.003
   */
  feeRate: number;
  movement10Percent?: PendlePtYtImpliedYieldChangeAmountResponse;
  yieldRange: PendleYieldRangeResponse;
  /**
   * APY including yield, swap fee and Pendle rewards without boosting
   * @example 0.123
   */
  aggregatedApy: number;
  /**
   * APY when maximum boost is applies
   * @example 0.123
   */
  maxBoostedApy: number;
}

export interface PendleMarketData {
  /**
   * market name
   * @example "crvUSD"
   */
  name: string;
  /**
   * market address
   * @example "0x386f90eb964a477498b528a39d9405e73ed4032b"
   */
  address: `0x${string}`;
  /**
   * market expiry date
   * @example "2024-03-28T00:00:00.000Z"
   */
  expiry: string;
  /**
   * market pt id
   * @example "1-0xb87511364014c088e30f872efc4a00d7efb843ac"
   */
  pt: string;
  /**
   * market yt id
   * @example "1-0xed97f94dd94255637a054098604e0201c442a3fd"
   */
  yt: string;
  /**
   * market sy id
   * @example "1-0xe05082b184a34668cd8a904d85fa815802bbb04c"
   */
  sy: string;
  /**
   * market underlying asset id
   * @example "1-0xa663b02cf0a4b149d2ad41910cb81e23e1c41c32"
   */
  underlyingAsset: string;
  /** Market details including liquidity, APY, fee rate, and yield range */
  details: PendleMarketDetails;
  /** Whether the market is new */
  isNew: boolean;
  /** Whether the market is prime */
  isPrime: boolean;
  /**
   * Market deployed timestamp
   * @format date-time
   */
  timestamp: string;
}

export interface PendleGetActiveMarketsResponse {
  /**
   * active market list
   * @example [{"name":"crvUSD","address":"0x386f90eb964a477498b528a39d9405e73ed4032b","expiry":"2024-03-28T00:00:00.000Z","pt":"1-0xb87511364014c088e30f872efc4a00d7efb843ac","yt":"1-0xed97f94dd94255637a054098604e0201c442a3fd","sy":"1-0xe05082b184a34668cd8a904d85fa815802bbb04c","underlyingAsset":"1-0xb27d1729489d04473631f0afaca3c3a7389ac9f8","details":{"liquidity":1000000,"pendleApy":0.05,"impliedApy":0.05,"feeRate":0.001,"yieldRange":{"min":0.01,"max":0.02},"aggregatedApy":0.1,"maxBoostedApy":0.1},"isNew":true,"isPrime":true,"timestamp":"2025-03-18T00:00:00.000Z"},{"name":"USD0++","address":"0x64506968e80c9ed07bff60c8d9d57474effff2c9","expiry":"2025-01-30T00:00:00.000Z","pt":"1-0x61439b9575278054d69c9176d88fafaf8319e4b7","yt":"1-0x9697e1ef258b847275e1b32f8a57b3a7e2f8ec50","sy":"1-0x52453825c287ddef62d647ce51c0979d27c461f7","underlyingAsset":"1-0x35d8949372d46b7a3d5a56006ae77b215fc69bc0","details":{"liquidity":1000000,"pendleApy":0.05,"impliedApy":0.05,"feeRate":0.001,"yieldRange":{"min":0.01,"max":0.02},"aggregatedApy":0.1,"maxBoostedApy":0.1},"isNew":false,"isPrime":false,"timestamp":"2025-02-18T00:00:00.000Z"}]
   */
  markets: PendleMarketData[];
}

export interface PendleGetInactiveMarketsResponse {
  /**
   * inactive market list
   * @example [{"name":"crvUSD","address":"0x386f90eb964a477498b528a39d9405e73ed4032b","expiry":"2024-03-28T00:00:00.000Z","pt":"1-0xb87511364014c088e30f872efc4a00d7efb843ac","yt":"1-0xed97f94dd94255637a054098604e0201c442a3fd","sy":"1-0xe05082b184a34668cd8a904d85fa815802bbb04c","underlyingAsset":"1-0xb27d1729489d04473631f0afaca3c3a7389ac9f8","details":{"liquidity":1000000,"pendleApy":0.05,"impliedApy":0.05,"feeRate":0.001,"yieldRange":{"min":0.01,"max":0.02},"aggregatedApy":0.1,"maxBoostedApy":0.1},"isNew":true,"isPrime":true,"timestamp":"2025-03-18T00:00:00.000Z"},{"name":"USD0++","address":"0x64506968e80c9ed07bff60c8d9d57474effff2c9","expiry":"2025-01-30T00:00:00.000Z","pt":"1-0x61439b9575278054d69c9176d88fafaf8319e4b7","yt":"1-0x9697e1ef258b847275e1b32f8a57b3a7e2f8ec50","sy":"1-0x52453825c287ddef62d647ce51c0979d27c461f7","underlyingAsset":"1-0x35d8949372d46b7a3d5a56006ae77b215fc69bc0","details":{"liquidity":1000000,"pendleApy":0.05,"impliedApy":0.05,"feeRate":0.001,"yieldRange":{"min":0.01,"max":0.02},"aggregatedApy":0.1,"maxBoostedApy":0.1},"isNew":false,"isPrime":false,"timestamp":"2025-02-18T00:00:00.000Z"}]
   */
  markets: PendleMarketData[];
}

export interface PendleAssetData {
  /**
   * asset name
   * @example "PT FRAX-USDC"
   */
  name: string;
  /**
   * asset decimals
   * @example 18
   */
  decimals: number;
  /**
   * asset address
   * @example "0x5fe30ac5cb1abb0e44cdffb2916c254aeb368650"
   */
  address: `0x${string}`;
  /**
   * asset symbol
   * @example "PT-FRAXUSDC_CurveLP Convex-30MAR2023"
   */
  symbol: string;
  /**
   * asset tags
   * @example ["PT"]
   */
  tags: string[];
  /**
   * asset expiry
   * @example "2023-03-30T00:00:00.000Z"
   */
  expiry: string;
  /**
   * asset pro icon
   * @example "https://storage.googleapis.com/prod-pendle-bucket-a/images/uploads/0d3199a2-0565-4355-ad52-6bfdc67e3467.svg"
   */
  proIcon: string;
}

export interface PendleGetAssetsResponse {
  /**
   * list of assets
   * @example [{"name":"PT FRAX-USDC","decimals":18,"address":"0x5fe30ac5cb1abb0e44cdffb2916c254aeb368650","symbol":"PT-FRAXUSDC_CurveLP Convex-30MAR2023","tags":["PT"],"expiry":"2023-03-30T00:00:00.000Z","proIcon":"https://storage.googleapis.com/prod-pendle-bucket-a/images/assets/pro/acad6337-8ce4-47c2-87a7-c270aab01b3d.svg"},{"name":"YT FRAX-USDC","decimals":18,"address":"0xc5cd692e9b4622ab8cdb57c83a0f99f874a169cd","symbol":"YT-FRAXUSDC_CurveLP Convex-30MAR2023","tags":["YT"],"expiry":"2023-03-30T00:00:00.000Z","proIcon":"https://storage.googleapis.com/prod-pendle-bucket-a/images/assets/pro/2239e536-439d-4c58-a417-805fb63c7ced.svg"}]
   */
  assets: PendleAssetData[];
}

export interface PendleGetAssetPricesResponse {
  /** @example {"0x5fe30ac5cb1abb0e44cdffb2916c254aeb368650":0.9989673642973003,"0xd393d1ddd6b8811a86d925f5e14014282581bc04":1.001712} */
  prices: Record<string, number>;
  /** Total number of assets */
  total: number;
  /** Number of assets got skipped */
  skip: number;
  /** Number of assets limited by the query */
  limit?: number | null;
}

export interface PendleOrderFilledStatusResponse {
  /** BigInt string of netInputFromMaker, the unit is the same as making amount */
  netInputFromMaker: string;
  /** BigInt string of netOutputToMaker, the unit is SY if the order is PT_FOR_TOKEN or YT_FOR_TOKEN, otherwise, the unit it PT or YT depends on type of order */
  netOutputToMaker: string;
  /** BigInt string of feeAmount, in SY */
  feeAmount: string;
  /** BigInt string of notionalVolume, in SY */
  notionalVolume: string;
}

export interface PendleOrderStateResponse {
  orderType: string;
  exchangeRate: string;
  psAmountToTaker: string;
  psAmountFromTaker: string;
  ysAmountToTaker: string;
  ysAmountFromTaker: string;
  fee: string;
  psRate: number;
  ysRate: number;
  /** In SY if the order is PY for token */
  netToMakerIfFullyFilled: string;
  /** The difference with currentMakingAmount is that this is in SY if currentMakingAmount in tokenIn */
  netFromMakerIfFullyFilled: string;
  notionalVolume: string;
  matchableAmount: string;
  notionalVolumeUSD: number;
}

export interface PendleLimitOrderResponse {
  /** Hash of the order */
  id: string;
  /** Signature of order, signed by maker */
  signature: string;
  /** Chain id */
  chainId: number;
  /** BigInt string of salt */
  salt: string;
  /** BigInt string of expiry, in second */
  expiry: string;
  /** BigInt string of nonce */
  nonce: string;
  /** LimitOrderType { 0 : TOKEN_FOR_PT, 1 : PT_FOR_TOKEN, 2 : TOKEN_FOR_YT, 3 : YT_FOR_TOKEN } */
  type: 0 | 1 | 2 | 3;
  /** Token used by user to make order */
  token: string;
  /** YT address */
  yt: string;
  /** Maker address */
  maker: string;
  /** Receiver address */
  receiver: string;
  /** BigInt string of making amount, the amount of token if the order is TOKEN_FOR_PT or TOKEN_FOR_YT, otherwise the amount of PT or YT */
  makingAmount: string;
  /** BigInt string of remaining making amount, the unit is the same as makingAmount */
  currentMakingAmount: string;
  /** BigInt string of lnImpliedRate */
  lnImpliedRate: string;
  /** BigInt string of failSafeRate */
  failSafeRate: string;
  /** Bytes string for permit */
  permit: string;
  /** Order filled status */
  orderFilledStatus: PendleOrderFilledStatusResponse;
  isActive: boolean;
  isCanceled: boolean;
  /** @format date-time */
  createdAt: string;
  /** Order state */
  orderState?: PendleOrderStateResponse;
  /**
   * Fully filled timestamp
   * @format date-time
   */
  fullyExecutedTimestamp?: string;
  /**
   * Canceled timestamp
   * @format date-time
   */
  canceledTimestamp?: string;
  /**
   * Timestamp of latest event
   * @format date-time
   */
  latestEventTimestamp?: string;
  /** SY address */
  sy: string;
  /** PT address */
  pt: string;
  /** Min(maker balance, maker allowance) */
  makerBalance: string;
  /** Simulate result of the order to mint sy */
  failedMintSy: boolean;
  /** Bigint string of amount shown on order book */
  orderBookBalance: string;
  /** Making token address */
  makingToken: string;
  /** Taking token address */
  takingToken: string;
  /** LimitOrderStatus */
  status:
    | "FILLABLE"
    | "PARTIAL_FILLABLE"
    | "FAILED_TRANSFER_TOKEN"
    | "EMPTY_MAKER_BALANCE"
    | "CANCELLED"
    | "FULLY_FILLED"
    | "EXPIRED";
}

export interface PendleLimitOrdersResponse {
  total: number;
  limit: number;
  skip: number;
  results: PendleLimitOrderResponse[];
}

export interface PendleMakerResponse {
  maker: string;
  sumOrderSizeUsd: number;
  numOrders: number;
}

export interface PendleMakersResponse {
  result: PendleMakerResponse[];
}

export interface PendleGenerateLimitOrderDataDto {
  /** Chain Id */
  chainId: number;
  /** YT address */
  YT: string;
  /** LimitOrderType { 0 : TOKEN_FOR_PT, 1 : PT_FOR_TOKEN, 2 : TOKEN_FOR_YT, 3 : YT_FOR_TOKEN } */
  orderType: 0 | 1 | 2 | 3;
  /** Input token if type is TOKEN_FOR_PT or TOKEN_FOR_YT, output token otherwise */
  token: string;
  /** Maker address */
  maker: string;
  /** BigInt string of making amount, the amount of token if the order is TOKEN_FOR_PT or TOKEN_FOR_YT, otherwise the amount of PT or YT */
  makingAmount: string;
  /** Implied APY of this limit order */
  impliedApy: number;
  /** Timestamp of order's expiry, in seconds */
  expiry: string;
}

export interface PendleGenerateLimitOrderDataResponse {
  /** Chain id */
  chainId: number;
  /** YT address */
  YT: string;
  /** BigInt string of salt. Salt is a random generated number to distinguish between orders.Because of some technical reason, this number must be dividable by 12421 */
  salt: string;
  /** Limit order expiry, in string */
  expiry: string;
  /** Nonce of the limit order, this will help the maker to cancel all the limit order they created */
  nonce: string;
  /** Input token if type is TOKEN_FOR_PT or TOKEN_FOR_YT, output token otherwise */
  token: string;
  /** LimitOrderType { 0 : TOKEN_FOR_PT, 1 : PT_FOR_TOKEN, 2 : TOKEN_FOR_YT, 3 : YT_FOR_TOKEN } */
  orderType: 0 | 1 | 2 | 3;
  /** BigInt string of failSafeRate */
  failSafeRate: string;
  /** Maker's address */
  maker: string;
  /** Maker's address */
  receiver: string;
  /** BigInt string of making amount, the amount of token if the order is TOKEN_FOR_PT or TOKEN_FOR_YT, otherwise the amount of PT or YT */
  makingAmount: string;
  permit: string;
  /**
   * ln(impliedRate) * 10**18, returned as bigint string
   * @format int64
   */
  lnImpliedRate: number;
}

export interface PendleHttpErrorResponse {
  message: string;
  statusCode: number;
  error: string;
}

export interface PendleCreateLimitOrderDto {
  /** Chain Id */
  chainId: number;
  /** Signature of order, signed by maker */
  signature: string;
  /** BigInt string of salt */
  salt: string;
  /** BigInt string of expiry */
  expiry: string;
  /** BigInt string of nonce */
  nonce: string;
  /** LimitOrderType { 0 : TOKEN_FOR_PT, 1 : PT_FOR_TOKEN, 2 : TOKEN_FOR_YT, 3 : YT_FOR_TOKEN } */
  type: 0 | 1 | 2 | 3;
  /** Token used by user to make order */
  token: string;
  /** YT address */
  yt: string;
  /** Maker address */
  maker: string;
  /** Receiver address */
  receiver: string;
  /** BigInt string of making amount */
  makingAmount: string;
  /** BigInt string of lnImpliedRate */
  lnImpliedRate: string;
  /** BigInt string of failSafeRate */
  failSafeRate: string;
  /** Bytes string for permit */
  permit: string;
}

export interface PendleLimitOrderTakerResponse {
  order: PendleLimitOrderResponse;
  /** Amount to be used to fill the order, the unit is the same as the unit of limit order' making amount */
  makingAmount: string;
  /** Amount from taker need to fully fill this order, the unit is SY if the market order is TOKEN_FOR_PT or TOKEN_FOR_YT, otherwise, the unit it PT or YT depends on type of order */
  netFromTaker: string;
  /** Actual making amount to taker, the unit is SY if the market order is PT_FOR_TOKEN or YT_FOR_TOKEN, otherwise, the unit it PT or YT depends on type of order */
  netToTaker: string;
}

export interface PendleLimitOrdersTakerResponse {
  total: number;
  limit: number;
  skip: number;
  results: PendleLimitOrderTakerResponse[];
}

export interface PendleMarketTokensResponse {
  /** tokens can be use for tokenMintSy */
  tokensMintSy: string[];
  /** tokens can be use for tokenRedeemSy */
  tokensRedeemSy: string[];
  /** input tokens of swap or zap function */
  tokensIn: string[];
  /** output tokens of swap or zap function */
  tokensOut: string[];
}

export interface PendleGetSpotSwappingPriceResponse {
  /** underlying token address that will be used for swapping */
  underlyingToken: string;
  /** number of PT by swapping 1 underlying token. If the swap can not be done, this value will be null */
  underlyingTokenToPtRate: object | null;
  /** number of underlying token by swapping 1 PT. If the swap can not be done, this value will be null */
  ptToUnderlyingTokenRate: object | null;
  /** number of YT by swapping 1 underlying token. If the swap can not be done, this value will be null */
  underlyingTokenToYtRate: object | null;
  /** number of underlying token by swapping 1 YT. If the swap can not be done, this value will be null */
  ytToUnderlyingTokenRate: object | null;
  /** implied apy of the given market */
  impliedApy: number;
}

export interface PendleTransactionDto {
  /** Transaction data */
  data: `0x${string}`;
  /** Transaction receiver */
  to: `0x${string}`;
  /** Transaction sender */
  from: `0x${string}`;
  /** Transaction value */
  value?: string;
}

export interface PendleTokenAmountResponse {
  token: string;
  amount: string;
}

export interface PendleImpliedApy {
  before: number;
  after: number;
}

export interface PendleSwapData {
  amountOut: string;
  priceImpact: number;
  impliedApy?: PendleImpliedApy;
  effectiveApy?: number;
}

export interface PendleSwapResponse {
  /** Method name */
  method: string;
  /** Contract call parameters name */
  contractCallParamsName: string[];
  /** Contract call parameters */
  contractCallParams: any[][];
  /** Transaction data */
  tx: PendleTransactionDto;
  tokenApprovals?: PendleTokenAmountResponse[];
  data: PendleSwapData;
}

export interface PendleAddLiquidityData {
  amountLpOut: string;
  amountYtOut: string;
  priceImpact: number;
  impliedApy?: PendleImpliedApy;
}

export interface PendleAddLiquidityResponse {
  /** Method name */
  method: string;
  /** Contract call parameters name */
  contractCallParamsName: string[];
  /** Contract call parameters */
  contractCallParams: any[][];
  /** Transaction data */
  tx: PendleTransactionDto;
  tokenApprovals?: PendleTokenAmountResponse[];
  data: PendleAddLiquidityData;
}

export interface PendleRemoveLiquidityData {
  amountOut: string;
  priceImpact: number;
  impliedApy?: PendleImpliedApy;
}

export interface PendleRemoveLiquidityResponse {
  /** Method name */
  method: string;
  /** Contract call parameters name */
  contractCallParamsName: string[];
  /** Contract call parameters */
  contractCallParams: any[][];
  /** Transaction data */
  tx: PendleTransactionDto;
  tokenApprovals?: PendleTokenAmountResponse[];
  data: PendleRemoveLiquidityData;
}

export interface PendleMintData {
  amountOut: string;
  priceImpact: number;
}

export interface PendleMintResponse {
  /** Method name */
  method: string;
  /** Contract call parameters name */
  contractCallParamsName: string[];
  /** Contract call parameters */
  contractCallParams: any[][];
  /** Transaction data */
  tx: PendleTransactionDto;
  tokenApprovals?: PendleTokenAmountResponse[];
  data: PendleMintData;
}

export interface PendleRedeemData {
  amountOut: string;
  priceImpact: number;
}

export interface PendleRedeemResponse {
  /** Method name */
  method: string;
  /** Contract call parameters name */
  contractCallParamsName: string[];
  /** Contract call parameters */
  contractCallParams: any[][];
  /** Transaction data */
  tx: PendleTransactionDto;
  tokenApprovals?: PendleTokenAmountResponse[];
  data: PendleRedeemData;
}

export interface PendleMintSyData {
  amountOut: string;
  priceImpact: number;
}

export interface PendleMintSyResponse {
  /** Method name */
  method: string;
  /** Contract call parameters name */
  contractCallParamsName: string[];
  /** Contract call parameters */
  contractCallParams: any[][];
  /** Transaction data */
  tx: PendleTransactionDto;
  tokenApprovals?: PendleTokenAmountResponse[];
  data: PendleMintSyData;
}

export interface PendleRedeemSyData {
  amountOut: string;
  priceImpact: number;
}

export interface PendleRedeemSyResponse {
  /** Method name */
  method: string;
  /** Contract call parameters name */
  contractCallParamsName: string[];
  /** Contract call parameters */
  contractCallParams: any[][];
  /** Transaction data */
  tx: PendleTransactionDto;
  tokenApprovals?: PendleTokenAmountResponse[];
  data: PendleRedeemSyData;
}

export interface PendleTransferLiquidityData {
  amountLpOut: string;
  amountYtOut: string;
  priceImpact: number;
}

export interface PendleContractParamInfo {
  /** Method name */
  method: string;
  /** Contract call parameters name */
  contractCallParamsName: string[];
  /** Contract call parameters */
  contractCallParams: any[][];
}

export interface PendleParamsBreakdown {
  selfCall1: PendleContractParamInfo;
  selfCall2?: PendleContractParamInfo;
  reflectCall: PendleContractParamInfo;
}

export interface PendleTransferLiquidityResponse {
  /** Method name */
  method: string;
  /** Contract call parameters name */
  contractCallParamsName: string[];
  /** Contract call parameters */
  contractCallParams: any[][];
  /** Transaction data */
  tx: PendleTransactionDto;
  tokenApprovals?: PendleTokenAmountResponse[];
  data: PendleTransferLiquidityData;
  paramsBreakdown: PendleParamsBreakdown;
}

export interface PendleRollOverPtData {
  amountPtOut: string;
  priceImpact: number;
}

export interface PendleRollOverPtResponse {
  /** Method name */
  method: string;
  /** Contract call parameters name */
  contractCallParamsName: string[];
  /** Contract call parameters */
  contractCallParams: any[][];
  /** Transaction data */
  tx: PendleTransactionDto;
  tokenApprovals?: PendleTokenAmountResponse[];
  data: PendleRollOverPtData;
  paramsBreakdown: PendleParamsBreakdown;
}

export interface PendleAddLiquidityDualData {
  amountOut: string;
  priceImpact: number;
}

export interface PendleAddLiquidityDualResponse {
  /** Method name */
  method: string;
  /** Contract call parameters name */
  contractCallParamsName: string[];
  /** Contract call parameters */
  contractCallParams: any[][];
  /** Transaction data */
  tx: PendleTransactionDto;
  tokenApprovals?: PendleTokenAmountResponse[];
  data: PendleAddLiquidityDualData;
}

export interface PendleRemoveLiquidityDualData {
  amountTokenOut: string;
  amountPtOut: string;
  priceImpact: number;
}

export interface PendleRemoveLiquidityDualResponse {
  /** Method name */
  method: string;
  /** Contract call parameters name */
  contractCallParamsName: string[];
  /** Contract call parameters */
  contractCallParams: any[][];
  /** Transaction data */
  tx: PendleTransactionDto;
  tokenApprovals?: PendleTokenAmountResponse[];
  data: PendleRemoveLiquidityDualData;
}

export interface PendleSdkResponse {
  /** Method name */
  method: string;
  /** Contract call parameters name */
  contractCallParamsName: string[];
  /** Contract call parameters */
  contractCallParams: any[][];
  /** Transaction data */
  tx: PendleTransactionDto;
  tokenApprovals?: PendleTokenAmountResponse[];
}

export interface PendlePendleSwapInput {
  token: string;
  amount: string;
}

export interface PendlePendleSwapDto {
  /** The address to receive the output of the action */
  receiver: string;
  inputs: PendlePendleSwapInput[];
  tokenOut: string;
  /** Max slippage accepted. A value from 0 to 1 (0.01 is 1%) */
  slippage: number;
}

export interface PendlePendleSwapData {
  amountOut: string;
  priceImpact: number;
}

export interface PendlePendleSwapResponse {
  /** Method name */
  method: string;
  /** Contract call parameters name */
  contractCallParamsName: string[];
  /** Contract call parameters */
  contractCallParams: any[][];
  /** Transaction data */
  tx: PendleTransactionDto;
  tokenApprovals?: PendleTokenAmountResponse[];
  data: PendlePendleSwapData;
}

export interface PendleRedeemInterestsAndRewardsResponse {
  /** Method name */
  method: string;
  /** Contract call parameters name */
  contractCallParamsName: string[];
  /** Contract call parameters */
  contractCallParams: any[][];
  /** Transaction data */
  tx: PendleTransactionDto;
  tokenApprovals?: PendleTokenAmountResponse[];
}

export interface PendleMarketApyHistoriesCSVResponse {
  total: number;
  timestamp_start: number;
  timestamp_end: number;
  results: string;
}

export interface PendleValuationResponse {
  usd?: number | null;
  acc?: number | null;
}

export interface PendleAssetResponse {
  id: string;
  chainId: number;
  address: `0x${string}`;
  symbol: string;
  decimals: number;
  /** @format date-time */
  expiry?: string | null;
  accentColor?: string | null;
  price?: PendleValuationResponse | null;
  /** @format date-time */
  priceUpdatedAt?: string | null;
  name: string;
  baseType: string;
  types: string[];
  protocol?: string | null;
  underlyingPool?: string | null;
  proSymbol?: string | null;
  proIcon?: string | null;
  zappable?: boolean | null;
  simpleName: string;
  simpleSymbol: string;
  simpleIcon: string;
  proName: string;
}

export interface PendleMarketExtendedInfoResponse {
  floatingPt: number;
  floatingSy: number;
  /** Sy supply cap. Only available for sy with cap, otherwise null. Number is in decimal format */
  sySupplyCap?: number | null;
  /** Sy current supply. Only available for sy with cap, otherwise null. Number is in decimal format */
  syCurrentSupply?: number | null;
  pyUnit: string;
  ptEqualsPyUnit: boolean;
  underlyingAssetWorthMore?: string;
  nativeWithdrawalURL?: string;
  nativeDepositURL?: string;
  defaultMigratePool?: string;
  movement10Percent: PendlePtYtImpliedYieldChangeAmountResponse;
  feeRate?: number;
  yieldRange?: PendleYieldRangeResponse;
}

export interface PendleMarketBasicMetadataResponse {
  id: string;
  chainId: number;
  address: `0x${string}`;
  symbol: string;
  /** @format date-time */
  expiry: string;
  pt: PendleAssetResponse;
  yt: PendleAssetResponse;
  sy: PendleAssetResponse;
  lp: PendleAssetResponse;
  accountingAsset: PendleAssetResponse;
  underlyingAsset: PendleAssetResponse;
  /**
   * Same as accountingAsset
   * @deprecated
   */
  basePricingAsset?: PendleAssetResponse | null;
  protocol?: string | null;
  underlyingPool?: string | null;
  proSymbol?: string | null;
  proIcon?: string | null;
  assetRepresentation: string;
  isWhitelistedPro: boolean;
  isWhitelistedSimple: boolean;
  votable: boolean;
  isActive: boolean;
  isWhitelistedLimitOrder: boolean;
  accentColor?: string | null;
  totalPt?: number | null;
  totalSy?: number | null;
  totalLp?: number | null;
  liquidity?: PendleValuationResponse | null;
  tradingVolume?: PendleValuationResponse | null;
  underlyingInterestApy?: number | null;
  underlyingRewardApy?: number | null;
  underlyingApy?: number | null;
  impliedApy?: number | null;
  ytFloatingApy?: number | null;
  ptDiscount?: number | null;
  swapFeeApy?: number | null;
  pendleApy?: number | null;
  arbApy?: number | null;
  aggregatedApy?: number | null;
  maxBoostedApy?: number | null;
  lpRewardApy?: number | null;
  voterApy?: number | null;
  ytRoi?: number | null;
  ptRoi?: number | null;
  /** @format date-time */
  dataUpdatedAt?: string | null;
  categoryIds: string[];
  /** @format date-time */
  timestamp: string;
  /** @format date-time */
  whitelistedProAt?: string | null;
  scalarRoot: number;
  initialAnchor: number;
  /** Additional market data, only available when market is whitelisted. */
  extendedInfo: PendleMarketExtendedInfoResponse;
  isFeatured?: boolean | null;
  isPopular?: boolean | null;
  /** @format date-time */
  tvlThresholdTimestamp?: string | null;
  /** Market which whitelisted in the last 2 weeks will have isNew==true */
  isNew: boolean;
  name: string;
  simpleName: string;
  simpleSymbol: string;
  simpleIcon: string;
  proName: string;
  farmName: string;
  farmSymbol: string;
  farmSimpleName: string;
  farmSimpleSymbol: string;
  farmSimpleIcon: string;
  farmProName: string;
  farmProSymbol: string;
  farmProIcon: string;
}

export interface PendleMarketsResponse {
  total: number;
  limit: number;
  skip: number;
  results: PendleMarketBasicMetadataResponse[];
}

export interface PendleCurrenyAmountEntity {
  currency: string;
  amount?: number | null;
}

export interface PendleFeaturedMarketEntity {
  marketAddress: string;
  icon: string;
  tokenSymbol: string;
  symbol: string;
  accentColor: string;
  discountedPrice: PendleCurrenyAmountEntity;
  fixedApy: number;
  currentPrice: PendleCurrenyAmountEntity;
}

export interface PendleFeaturedMarketsResponseEntity {
  total: number;
  limit: number;
  skip: number;
  results: PendleFeaturedMarketEntity[];
}

export interface PendleAssetBasicResponse {
  id: string;
  chainId: number;
  address: `0x${string}`;
  symbol: string;
  decimals: number;
  /** @format date-time */
  expiry?: string | null;
  accentColor?: string | null;
  price?: PendleValuationResponse | null;
  /** @format date-time */
  priceUpdatedAt?: string | null;
  name: string;
}

export interface PendleApyBreakdownResponse {
  asset: PendleAssetBasicResponse;
  absoluteApy: number;
  relativeApy: number;
  isExternalReward?: boolean | null;
}

export interface PendleEstimatedDailyPoolRewardResponse {
  asset: PendleAssetBasicResponse;
  amount: number;
}

export interface PendleMarketResponse {
  id: string;
  chainId: number;
  address: `0x${string}`;
  symbol: string;
  /** @format date-time */
  expiry: string;
  pt: PendleAssetResponse;
  yt: PendleAssetResponse;
  sy: PendleAssetResponse;
  lp: PendleAssetResponse;
  accountingAsset: PendleAssetResponse;
  underlyingAsset: PendleAssetResponse;
  /**
   * Same as accountingAsset
   * @deprecated
   */
  basePricingAsset?: PendleAssetResponse | null;
  rewardTokens: PendleAssetResponse[];
  inputTokens: PendleAssetResponse[];
  outputTokens: PendleAssetResponse[];
  protocol?: string | null;
  underlyingPool?: string | null;
  proSymbol?: string | null;
  proIcon?: string | null;
  assetRepresentation: string;
  isWhitelistedPro: boolean;
  isWhitelistedSimple: boolean;
  votable: boolean;
  isActive: boolean;
  isWhitelistedLimitOrder: boolean;
  accentColor?: string | null;
  totalPt?: number | null;
  totalSy?: number | null;
  totalLp?: number | null;
  totalActiveSupply?: number | null;
  liquidity?: PendleValuationResponse | null;
  tradingVolume?: PendleValuationResponse | null;
  underlyingInterestApy?: number | null;
  underlyingRewardApy?: number | null;
  underlyingRewardApyBreakdown?: PendleApyBreakdownResponse[] | null;
  underlyingApy?: number | null;
  impliedApy?: number | null;
  ytFloatingApy?: number | null;
  ptDiscount?: number | null;
  swapFeeApy?: number | null;
  pendleApy?: number | null;
  arbApy?: number | null;
  aggregatedApy?: number | null;
  maxBoostedApy?: number | null;
  lpRewardApy?: number | null;
  voterApy?: number | null;
  ytRoi?: number | null;
  ptRoi?: number | null;
  estimatedDailyPoolRewards?: PendleEstimatedDailyPoolRewardResponse[] | null;
  /** @format date-time */
  dataUpdatedAt?: string | null;
  liquidityChange24h?: number | null;
  tradingVolumeChange24h?: number | null;
  underlyingInterestApyChange24h?: number | null;
  underlyingRewardApyChange24h?: number | null;
  underlyingApyChange24h?: number | null;
  impliedApyChange24h?: number | null;
  ytFloatingApyChange24h?: number | null;
  ptDiscountChange24h?: number | null;
  swapFeeApyChange24h?: number | null;
  pendleApyChange24h?: number | null;
  aggregatedApyChange24h?: number | null;
  lpRewardApyChange24h?: number | null;
  voterApyChange24h?: number | null;
  categoryIds: string[];
  /** @format date-time */
  timestamp: string;
  scalarRoot: number;
  initialAnchor: number;
  /** Additional market data, only available when market is whitelisted. */
  extendedInfo: PendleMarketExtendedInfoResponse;
  isFeatured?: boolean | null;
  isPopular?: boolean | null;
  /** @format date-time */
  tvlThresholdTimestamp?: string | null;
  /** @format date-time */
  whitelistedProAt?: string | null;
  /** Market which whitelisted in the last 2 weeks will have isNew==true */
  isNew: boolean;
  name: string;
  simpleName: string;
  simpleSymbol: string;
  simpleIcon: string;
  proName: string;
  farmName: string;
  farmSymbol: string;
  farmSimpleName: string;
  farmSimpleSymbol: string;
  farmSimpleIcon: string;
  farmProName: string;
  farmProSymbol: string;
  farmProIcon: string;
}

export interface PendleMarketDataResponse {
  /** @format date-time */
  timestamp: string;
  liquidity: PendleValuationResponse;
  tradingVolume: PendleValuationResponse;
  underlyingInterestApy: number;
  underlyingRewardApy: number;
  underlyingApy: number;
  impliedApy: number;
  ytFloatingApy: number;
  swapFeeApy: number;
  voterApy: number;
  ptDiscount: number;
  pendleApy: number;
  arbApy: number;
  lpRewardApy: number;
  aggregatedApy: number;
  maxBoostedApy: number;
  estimatedDailyPoolRewards: PendleEstimatedDailyPoolRewardResponse[];
  totalPt: number;
  totalSy: number;
  totalLp: number;
  totalActiveSupply: number;
  assetPriceUsd: number;
}

export interface PendleMarketHistoryResponse {
  /** @format date-time */
  timestamp: string;
  liquidity: PendleValuationResponse;
  tradingVolume: PendleValuationResponse;
  underlyingInterestApy: number;
  underlyingRewardApy: number;
  underlyingApy: number;
  impliedApy: number;
  ytFloatingApy: number;
  ptDiscount: number;
  swapFeeApy: number;
  pendleApy: number;
  aggregatedApy: number;
  lpRewardApy: number;
  voterApy: number;
  totalPt: number;
  totalSy: number;
  totalLp: number;
  totalActiveSupply: number;
}

export interface PendleMarketHistoriesResponse {
  total: number;
  limit?: number;
  /** @format date-time */
  timestamp_start: string;
  /** @format date-time */
  timestamp_end?: string;
  results: PendleMarketHistoryResponse[];
}

export interface PendleMarketApyHistoryResponse {
  /** @format date-time */
  timestamp: string;
  underlyingApy: number;
  impliedApy: number;
}

export interface PendleMarketApyHistoriesResponse {
  total: number;
  limit: number;
  /** @format date-time */
  timestamp_start: string;
  /** @format date-time */
  timestamp_end: string;
  results: PendleMarketApyHistoryResponse[];
}

export interface PendleGetMarketStatHistoryCSVResponse {
  /** total data point of the result */
  total: number;
  /** timestamp start of the result */
  timestamp_start: number;
  /** timestamp end of the result */
  timestamp_end: number;
  /** csv result with 4 column: timestamp,maxApy,baseApy,tvl. Timestamp is in second, tvl is in usd */
  results: string;
}

export interface PendleMarketHistoricalDataTableResponse {
  total: number;
  timestamp_start: number;
  timestamp_end: number;
  /** Array of timestamp in second */
  timestamp: number[];
  /** Array of maxApy. 0.5 means 50% */
  maxApy: number[];
  /** Array of baseApy. 0.5 means 50% */
  baseApy: number[];
  /** Array of underlyingApy. 0.5 means 50% */
  underlyingApy: number[];
  /** Array of impliedApy. 0.5 means 50% */
  impliedApy: number[];
  /** Array of tvl */
  tvl: number[];
}

export interface PendleMarketImpliedApyDataPoint {
  timestamp: number;
  impliedApy: number;
}

export interface PendleMarketImpliedApyResponseEntity {
  total: number;
  timestamp_start?: number;
  timestamp_end?: number;
  results: PendleMarketImpliedApyDataPoint[];
}

export interface PendleMarketAssetsResponse {
  pt: PendleAssetResponse;
  yt: PendleAssetResponse;
  sy: PendleAssetResponse;
  lp: PendleAssetResponse;
  accountingAsset: PendleAssetResponse;
  underlyingAsset: PendleAssetResponse;
  /**
   * Same as accountingAsset
   * @deprecated
   */
  basePricingAsset: PendleAssetResponse;
  rewardTokens: PendleAssetResponse[];
  inputTokens: PendleAssetResponse[];
  outputTokens: PendleAssetResponse[];
}

export interface PendleSwapAmountToChangeApyResponse {
  /** Bigint string of the amount required to swap in the market to change the implied apy to XXX */
  amount: string;
}

export interface PendleMarketCategoryResponse {
  id: string;
  name: string;
}

export interface PendleGetAllMarketCategoriesResponse {
  results: PendleMarketCategoryResponse[];
}

export interface PendleUtilizedProtocolResponse {
  id: string;
  url: string;
  name: string;
  imageUrl: string;
}

export interface PendleGetAllUtilizedProtocolsResponse {
  results: PendleUtilizedProtocolResponse[];
}

export interface PendleAssetsResponse {
  total: number;
  limit: number;
  skip: number;
  results: PendleAssetResponse[];
}

export interface PendleAssetCSVResponse {
  results: string;
}

export interface PendleVersionResponse {
  major: number;
  minor: number;
  patch: number;
}

export interface PendleTokenInfoResponse {
  chainId: number;
  address: `0x${string}`;
  decimals: number;
  name: string;
  symbol: string;
  logoURI: string;
  tags: string[];
  extensions: object;
}

export interface PendleUniswapTokenListResponse {
  name: string;
  timestamp: string;
  version: PendleVersionResponse;
  tokens: PendleTokenInfoResponse[];
  tokenMap: Record<string, PendleTokenInfoResponse>;
  keywords: string[];
  logoURI: string;
  tags: Record<string, PendleTagDefinitionResponse>;
}

export interface PendleSyBasicResponse {
  id: string;
  chainId: number;
  address: `0x${string}`;
  symbol: string;
  decimals: number;
  /** @format date-time */
  expiry?: string | null;
  accentColor?: string | null;
  price?: PendleValuationResponse | null;
  /** @format date-time */
  priceUpdatedAt?: string | null;
  name: string;
  baseType: string;
  types: string[];
  protocol?: string | null;
  underlyingPool?: string | null;
  proSymbol?: string | null;
  proIcon?: string | null;
  zappable?: boolean | null;
  simpleName: string;
  simpleSymbol: string;
  simpleIcon: string;
  proName: string;
  accountingAssetType: number;
  /** Accounting asset id */
  accountingAsset: string;
  /** Underlying asset id */
  underlyingAsset: string;
  /** Reward token ids */
  rewardTokens: string[];
  /** Input token ids */
  inputTokens: string[];
  /** Output token ids */
  outputTokens: string[];
}

export interface PendleWhitelistedSysResponse {
  results: PendleSyBasicResponse[];
}

export interface PendleSyResponse {
  id: string;
  chainId: number;
  address: `0x${string}`;
  symbol: string;
  decimals: number;
  /** @format date-time */
  expiry?: string | null;
  accentColor?: string | null;
  price?: PendleValuationResponse | null;
  /** @format date-time */
  priceUpdatedAt?: string | null;
  name: string;
  baseType: string;
  types: string[];
  protocol?: string | null;
  underlyingPool?: string | null;
  proSymbol?: string | null;
  proIcon?: string | null;
  zappable?: boolean | null;
  simpleName: string;
  simpleSymbol: string;
  simpleIcon: string;
  proName: string;
  accountingAssetType: number;
  accountingAsset: PendleAssetResponse;
  underlyingAsset: PendleAssetResponse;
  rewardTokens: PendleAssetResponse[];
  inputTokens: PendleAssetResponse[];
  outputTokens: PendleAssetResponse[];
}

export interface PendlePoolResponse {
  id: string;
  chainId: number;
  address: `0x${string}`;
  symbol: string;
  expiry: string;
  protocol?: string | null;
  underlyingPool?: string | null;
  voterApy: number;
  accentColor?: string | null;
  name: string;
  farmSimpleName: string;
  farmSimpleIcon: string;
  farmProName: string;
  farmProIcon: string;
}

export interface PendleVoteResponse {
  pool: PendlePoolResponse;
  votes: number;
  percentage: number;
}

export interface PendleVoteSnapshotResponse {
  votes: PendleVoteResponse[];
  totalPools: number;
  totalVotes: number;
  /** @format date-time */
  epoch: string;
}

export interface PendlePoolVoterApyResponse {
  pool: PendlePoolResponse;
  voterApy: number;
  lastEpochVoterApy: number;
  lastEpochChange: number;
}

export interface PendlePoolVoterApysResponse {
  results: PendlePoolVoterApyResponse[];
  totalPools: number;
  /** @format date-time */
  timestamp: string;
}

export interface PendlePoolVoterAprSwapFeeResponse {
  pool: PendlePoolResponse;
  voterApr: number;
  lastEpochVoterApr: number;
  voterAprChange: number;
  swapFee: number;
  lastEpochSwapFee: number;
  swapFeeChange: number;
  projectedVoterApr: number;
}

export interface PendlePoolVoterAprsSwapFeesResponse {
  results: PendlePoolVoterAprSwapFeeResponse[];
  totalPools: number;
  totalFee: number;
  /** @format date-time */
  timestamp: string;
}

export interface PendleVoterApyChartDataPoint {
  /** @format date-time */
  time: string;
  voterApy: number;
}

export interface PendlePoolVoterApyChart {
  values: PendleVoterApyChartDataPoint[];
  pool: PendlePoolResponse;
}

export interface PendleVoterApyChartResponse {
  results: PendlePoolVoterApyChart[];
}

export interface PendleVePendleApyChartDataPoint {
  /** @format date-time */
  time: string;
  vePendleBaseApy: number;
  vePendleMaxApy: number;
}

export interface PendleVePendleApyChartResponse {
  results: PendleVePendleApyChartDataPoint[];
  timeFrame: string;
  /** @format date-time */
  timestamp_gte: string;
  /** @format date-time */
  timestamp_lte: string;
}

export interface PendlePendleTokenSupplyResponse {
  /** @format date-time */
  timestamp: string;
  totalPendleCirculating: number;
  totalPendleLocked: number;
  totalPendleSupply: number;
}

export interface PendleVoteData {
  txHash: string;
  /** @format date-time */
  timestamp: string;
  poolChainId: number;
  poolAddress: string;
  user: string;
  weight: number;
  vePendleVote: number;
}

export interface PendleGetHistoricalVotesResponse {
  data: PendleVoteData[];
}

export interface PendleMarketMetaData {
  /** market id */
  id: string;
}

export interface PendleTotalFeesWithTimestamp {
  /**
   * timestamp where total fee is being calculated
   * @format date-time
   */
  time: string;
  /** total fees at given timestamp */
  totalFees: number;
}

export interface PendleMarketTotalFeesData {
  /** market metadata */
  market: PendleMarketMetaData;
  /** total fee at each timestamp */
  values: PendleTotalFeesWithTimestamp[];
}

export interface PendleAllMarketTotalFeesResponse {
  /** all market total fees response */
  results: PendleMarketTotalFeesData[];
}

export interface PendleGetOngoingVotesResponse {
  votes: PendleVoteResponse[];
  totalPools: number;
  totalVotes: number;
}

export interface PendlePriceOHLCVCSVResponse {
  total: number;
  currency: string;
  timeFrame: string;
  timestamp_start: number;
  timestamp_end: number;
  results: string;
}

export interface PendleAssetPricesResponse {
  /** The number of assets returned */
  total: number;
  /** Addresses of returned assets, can be mapped by index with priceUsd array */
  addresses: string[];
  /**
   * Price in usd of mapped asset, can be mapped by index with addresses array, return null if the asset doesnt have price
   * @example [1,2,null,4]
   */
  pricesUsd: (number | null)[];
}

export interface PendleNotionalVolumeResponse {
  /** List of timestamps, each will be mapped to a notional volume */
  timestamps: string[];
  /** List of notional volumes corresponding to each timestamp. It has the same length with timestamps array */
  volumes: number[];
}

export interface PendleOHLCVDataPoint {
  /** @format date-time */
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface PendlePriceOHLCVResponse {
  limit: number;
  total: number;
  currency: string;
  timeFrame: string;
  /** @format date-time */
  timestamp_start?: string;
  /** @format date-time */
  timestamp_end?: string;
  results: PendleOHLCVDataPoint[];
}

export interface PendleMarketBasicResponse {
  id: string;
  chainId: number;
  address: `0x${string}`;
  symbol: string;
  /** @format date-time */
  expiry: string;
  name: string;
}

export interface PendleAssetAmountResponse {
  asset: PendleAssetResponse;
  amount: number;
  price: PendleValuationResponse;
}

export interface PendleTransactionResponse {
  id: string;
  chainId: number;
  txHash: string;
  blockNumber: number;
  /** @format date-time */
  timestamp: string;
  action: string;
  origin: string;
  market: PendleMarketBasicResponse;
  inputs: PendleAssetAmountResponse[];
  outputs: PendleAssetAmountResponse[];
  user: string;
  valuation: PendleValuationResponse;
  implicitSwapFeeSy: number;
  explicitSwapFeeSy: number;
  impliedApy: number;
  assetPrices: object;
  gasUsed: number;
}

export interface PendleTransactionsResponse {
  total: number;
  limit: number;
  skip: number;
  results: PendleTransactionResponse[];
}

export interface PendleTransactionsV4Response {
  total: number;
  limit: number;
  skip: number;
  results: string[];
  /** Resume token for pagination. Use this to continue a previous query. Use this token in the next request. Can be undefined if the query is at the end of the results. */
  resumeToken?: string;
}

export interface PendleNotionalV5 {
  pt: number;
}

export interface PendleTransactionV5Response {
  id: string;
  market: string;
  /** @format date-time */
  timestamp: string;
  chainId: number;
  txHash: string;
  value: number;
  type: string;
  action: string;
  txOrigin?: string;
  impliedApy: number;
  notional?: PendleNotionalV5;
}

export interface PendleTransactionsV5Response {
  total: number;
  limit: number;
  skip: number;
  results: PendleTransactionV5Response[];
}

export interface PendleMetadataQueryDto {
  keys: string[];
}

export interface PendleMetadataResponse {
  results: object;
  total: number;
}

export interface PendleMetadataValuesResponse {
  /** Values of given metadata keys in the same order with keys */
  values: (object | null)[];
}

export interface PendleGetMetadataByTemplateResponse {
  keys: string[];
  /** Values of given metadata keys in the same order with keys */
  values: object[];
}

export interface PendleTvlAndTradingVolumeResponseEntity {
  tvl: number;
  tradingVolume: number;
}

export interface PendleGetDistinctUsersFromTokenEntity {
  users: string[];
}

export interface PendleMerkleRewardsResponse {
  accruedAmount: string;
  /** Only available for arbitrum-grant campaign */
  rewardBreakdowns: string[] | null;
  /** @format date-time */
  updatedAt: string;
}

export interface PendleMerkleProofResponse {
  proof: string[];
  accruedAmount: string;
  /** @format date-time */
  updatedAt: string;
  /** Calldata to verify the proof */
  verifyCallData?: string;
  /** Merkle root hash of the merkle tree */
  merkleRoot: string;
}

export interface PendleNotFoundResponse {
  message: string;
  statusCode: number;
}

export interface PendleTokenProof {
  token: string;
  proof: string[];
  accruedAmount: string;
  /** Calldata to verify the proof */
  verifyCallData?: string;
}

export interface PendleMultiTokenMerkleProofResponse {
  proof: PendleTokenProof[];
  merkleRoot: string;
  /** @format date-time */
  updatedAt: string;
  chainId: number;
  distributorAddress: string;
  campaignId: string;
}

export interface PendleMerkleProofV2Response {
  total: number;
  results: PendleMultiTokenMerkleProofResponse[];
}

export interface PendleSyTokenOutRouteResponse {
  toSyAddress: string;
  defaultTokenOut: string;
}

export interface PendleSyTokenOutRouteListResponse {
  tokenOutRoutes: PendleSyTokenOutRouteResponse[];
}

export interface PendleGetLiquidityTransferableMarketsResponse {
  /** list of liquidity transferable markets */
  marketAddresses: string[];
}

export interface PendleChainIdSimplifiedData {
  chainId: number;
  /** list of SY addresses */
  sys: string[];
  /** list of market addresses */
  markets: string[];
  /** list of PT addresses */
  pts: string[];
  /** list of YT addresses */
  yts: string[];
}

export interface PendleGetSimplifiedDataResponse {
  data: PendleChainIdSimplifiedData[];
}

export interface PendleChainIdsResponse {
  chainIds: number[];
}

export interface PendlePosition {
  /**
   * Balance of the position
   * @example "1000000000000000000"
   */
  balance: string;
  /**
   * Active balance of the position (for LP only)
   * @example "1000000000000000000"
   */
  activeBalance?: string;
  /**
   * Valuation of the position in USD
   * @example 10
   */
  valuation: number;
}

export interface PendleMarketPosition {
  /**
   * Unique identifier of the market
   * @example "1-0xabc..."
   */
  marketId: string;
  /** Principal token (PT) position */
  pt: PendlePosition;
  /** Yield token (YT) position */
  yt: PendlePosition;
  /** Liquidity provider (LP) token position */
  lp: PendlePosition;
}

export interface PendleSyPosition {
  /**
   * Unique identifier of the market
   * @example "1-0xabc"
   */
  syId: string;
  /**
   * Sy token (SY) balance in wei
   * @example "1000000000000000000"
   */
  balance: string;
}

export interface PendleUserPositionsResponse {
  /**
   * Chain ID
   * @example 1
   */
  chainId: number;
  /**
   * Total number of open positions
   * @example 100
   */
  totalOpen: number;
  /**
   * Total number of closed positions
   * @example 100
   */
  totalClosed: number;
  /**
   * Total number of SY positions
   * @example 100
   */
  totalSy: number;
  /** Array of user token positions */
  openPositions: PendleMarketPosition[];
  /** Array of closed user token positions */
  closedPositions: PendleMarketPosition[];
  /** Array of user SY positions */
  syPositions: PendleSyPosition[];
  /**
   * Date time of the last update
   * @format date-time
   * @example "2021-01-01T00:00:00.000Z"
   */
  updatedAt: string;
  /**
   * Error message when there is something wrong
   * @example "Error message"
   */
  errorMessage?: string;
}

export interface PendleUserPositionsCrossChainResponse {
  /** Array of user positions */
  positions: PendleUserPositionsResponse[];
}

export interface PendleTagDefinitionResponse {
  name: string;
  description: string;
}

export type PendleMarketsSimplifiedControllerGetActiveMarketsData =
  PendleGetActiveMarketsResponse;

export type PendleMarketsSimplifiedControllerGetInactiveMarketsData =
  PendleGetInactiveMarketsResponse;

export type PendleAssetsSimplifiedControllerGetAllAssetsData =
  PendleGetAssetsResponse;

export interface PendleAssetsSimplifiedControllerGetAllAssetPricesByAddressesParams {
  /**
   * Specify tokens to fetch price, leave blank to fetch all prices. Use comma separated values to search by multiple addresses. Upto 20 addresses allowed. This will ignore skip and limit parameters
   * @example "0x5fe30ac5cb1abb0e44cdffb2916c254aeb368650,0xc5cd692e9b4622ab8cdb57c83a0f99f874a169cd"
   */
  addresses?: string;
  /**
   * Number of results to skip.
   * @default 0
   */
  skip?: number;
  /** Maximum number of results to return. */
  limit?: number;
  /** Use comma separated values to search by multiple values. Possible values are PENDLE_LP, SY, PT and YT */
  type?: string;
  chainId: number;
}

export type PendleAssetsSimplifiedControllerGetAllAssetPricesByAddressesData =
  PendleGetAssetPricesResponse;

export interface PendleLimitOrdersControllerGetLimitOrdersParams {
  /**
   * Sort by field: 1 for ascending, -1 for descending
   * @example "name:1"
   */
  order_by?: string;
  /**
   * Number of results to skip. The parameter is capped at 1000.
   * @default 0
   */
  skip?: number;
  /**
   * Maximum number of results to return. The parameter is capped at 100.
   * @default 10
   */
  limit?: number;
  /** ChainId */
  chainId?: number;
  /** Order's YT address */
  yt?: string;
  /** Order's maker address */
  maker?: string;
  /** LimitOrderType { 0 : TOKEN_FOR_PT, 1 : PT_FOR_TOKEN, 2 : TOKEN_FOR_YT, 3 : YT_FOR_TOKEN } */
  type?: 0 | 1 | 2 | 3;
  /** Limit order implied type { 0 : SHORT_YIELD, 1 : LONG_YIELD } */
  tradeType?: 0 | 1;
  isActive?: boolean;
  isCancelled?: boolean;
  isFullyFilled?: boolean;
  minLnImpliedRate?: string;
  maxLnImpliedRate?: string;
}

export type PendleLimitOrdersControllerGetLimitOrdersData =
  PendleLimitOrdersResponse;

export interface PendleLimitOrdersControllerFetchMakersParams {
  chainId?: number;
  yt?: string;
  /** @default "sum_order_size" */
  sortBy?: "sum_order_size" | "num_orders";
  /** @default "desc" */
  sortOrder?: "asc" | "desc";
}

export type PendleLimitOrdersControllerFetchMakersData = PendleMakersResponse;

export interface PendleLimitOrdersControllerGetMakerLimitOrderParams {
  /**
   * Number of results to skip. The parameter is capped at 1000.
   * @default 0
   */
  skip?: number;
  /**
   * Maximum number of results to return. The parameter is capped at 100.
   * @default 10
   */
  limit?: number;
  /** ChainId */
  chainId: number;
  /** Maker's address */
  maker: string;
  /** Order's YT address */
  yt?: string;
  /** LimitOrderType { 0 : TOKEN_FOR_PT, 1 : PT_FOR_TOKEN, 2 : TOKEN_FOR_YT, 3 : YT_FOR_TOKEN } */
  type?: 0 | 1 | 2 | 3;
  /** isActive=true to get all maker's active orders, isActive=false otherwise and do not set isActive if you want to fetch all maker's orders */
  isActive?: boolean;
}

export type PendleLimitOrdersControllerGetMakerLimitOrderData =
  PendleLimitOrdersResponse;

export type PendleLimitOrdersControllerCreateOrderData =
  PendleLimitOrderResponse;

export type PendleLimitOrdersControllerGenerateLimitOrderDataData =
  PendleGenerateLimitOrderDataResponse;

export interface PendleLimitOrdersControllerGetTakerLimitOrdersParams {
  /**
   * Number of results to skip. The parameter is capped at 1000.
   * @default 0
   */
  skip?: number;
  /**
   * Maximum number of results to return. The parameter is capped at 100.
   * @default 10
   */
  limit?: number;
  /** ChainId */
  chainId: number;
  /** Order's YT address */
  yt: string;
  /** LimitOrderType { 0 : TOKEN_FOR_PT, 1 : PT_FOR_TOKEN, 2 : TOKEN_FOR_YT, 3 : YT_FOR_TOKEN } */
  type: 0 | 1 | 2 | 3;
  sortBy?: "Implied Rate";
  sortOrder?: "asc" | "desc";
}

export type PendleLimitOrdersControllerGetTakerLimitOrdersData =
  PendleLimitOrdersTakerResponse;

export type PendleSdkControllerGetMarketTokensData = PendleMarketTokensResponse;

export type PendleSdkControllerGetMarketSpotSwappingPriceData =
  PendleGetSpotSwappingPriceResponse;

export interface PendleSdkControllerSwapParams {
  /** The address to receive the output of the action */
  receiver: `0x${string}`;
  /** Max slippage accepted. A value from 0 to 1 (0.01 is 1%) */
  slippage: number;
  /**
   * Enable swap aggregator to swap between tokens that cannot be natively converted from/to the underlying asset
   * @default false
   */
  enableAggregator?: boolean;
  /** Address can be token / SY / PT or YT */
  tokenIn: `0x${string}`;
  /** Address can be token / SY / PT or YT */
  tokenOut: `0x${string}`;
  amountIn: string;
  /** Available fields: `impliedApy`, `effectiveApy`. Comma separated list of fields to return. For example: `field1,field2`. More fields will consume more computing units. */
  additionalData?: string;
  chainId: number;
  market: string;
}

export type PendleSdkControllerSwapData = PendleSwapResponse;

export interface PendleSdkControllerAddLiquidityParams {
  /** The address to receive the output of the action */
  receiver: string;
  /** Max slippage accepted. A value from 0 to 1 (0.01 is 1%) */
  slippage: number;
  /**
   * Enable swap aggregator to swap between tokens that cannot be natively converted from/to the underlying asset
   * @default false
   */
  enableAggregator?: boolean;
  /** Address can be token / SY / PT */
  tokenIn: string;
  amountIn: string;
  /**
   * Enable zero price impact mode. No price impact will incur & users will receive LP and YT (less LP compared to normal mode)
   * @default false
   */
  zpi?: boolean;
  /** Available fields: `impliedApy`. Comma separated list of fields to return. For example: `field1,field2`. More fields will consume more computing units. */
  additionalData?: string;
  chainId: number;
  market: string;
}

export type PendleSdkControllerAddLiquidityData = PendleAddLiquidityResponse;

export interface PendleSdkControllerRemoveLiquidityParams {
  /** The address to receive the output of the action */
  receiver: string;
  /** Max slippage accepted. A value from 0 to 1 (0.01 is 1%) */
  slippage: number;
  /**
   * Enable swap aggregator to swap between tokens that cannot be natively converted from/to the underlying asset
   * @default false
   */
  enableAggregator?: boolean;
  amountIn: string;
  /** Address can be token / SY */
  tokenOut: string;
  /** Available fields: `impliedApy`. Comma separated list of fields to return. For example: `field1,field2`. More fields will consume more computing units. */
  additionalData?: string;
  chainId: number;
  market: string;
}

export type PendleSdkControllerRemoveLiquidityData =
  PendleRemoveLiquidityResponse;

export interface PendleSdkControllerMintParams {
  /** The address to receive the output of the action */
  receiver: string;
  /** Max slippage accepted. A value from 0 to 1 (0.01 is 1%) */
  slippage: number;
  /**
   * Enable swap aggregator to swap between tokens that cannot be natively converted from/to the underlying asset
   * @default false
   */
  enableAggregator?: boolean;
  yt: string;
  /** Address can be token / SY */
  tokenIn: string;
  amountIn: string;
  chainId: number;
}

export type PendleSdkControllerMintData = PendleMintResponse;

export interface PendleSdkControllerRedeemParams {
  /** The address to receive the output of the action */
  receiver: string;
  /** Max slippage accepted. A value from 0 to 1 (0.01 is 1%) */
  slippage: number;
  /**
   * Enable swap aggregator to swap between tokens that cannot be natively converted from/to the underlying asset
   * @default false
   */
  enableAggregator?: boolean;
  yt: string;
  amountIn: string;
  /** Address can be token / SY */
  tokenOut: string;
  chainId: number;
}

export type PendleSdkControllerRedeemData = PendleRedeemResponse;

export interface PendleSdkControllerMintSyParams {
  /** The address to receive the output of the action */
  receiver: string;
  /** Max slippage accepted. A value from 0 to 1 (0.01 is 1%) */
  slippage: number;
  /**
   * Enable swap aggregator to swap between tokens that cannot be natively converted from/to the underlying asset
   * @default false
   */
  enableAggregator?: boolean;
  sy: string;
  /** Address can be token */
  tokenIn: string;
  amountIn: string;
  chainId: number;
}

export type PendleSdkControllerMintSyData = PendleMintSyResponse;

export interface PendleSdkControllerRedeemSyParams {
  /** The address to receive the output of the action */
  receiver: string;
  /** Max slippage accepted. A value from 0 to 1 (0.01 is 1%) */
  slippage: number;
  /**
   * Enable swap aggregator to swap between tokens that cannot be natively converted from/to the underlying asset
   * @default false
   */
  enableAggregator?: boolean;
  sy: string;
  amountIn: string;
  /** Address can be token */
  tokenOut: string;
  chainId: number;
}

export type PendleSdkControllerRedeemSyData = PendleRedeemSyResponse;

export interface PendleSdkControllerTransferLiquidityParams {
  /** The address to receive the output of the action */
  receiver: string;
  /** Max slippage accepted. A value from 0 to 1 (0.01 is 1%) */
  slippage: number;
  /** The destination market */
  dstMarket: string;
  lpAmount: string;
  ptAmount: string;
  ytAmount: string;
  /**
   * Redeem rewards
   * @default false
   */
  redeemRewards?: boolean;
  /**
   * Enable zero price impact mode. No price impact will incur & users will receive LP and YT (less LP compared to normal mode)
   * @default false
   */
  zpi?: boolean;
  chainId: number;
  market: string;
}

export type PendleSdkControllerTransferLiquidityData =
  PendleTransferLiquidityResponse;

export interface PendleSdkControllerRollOverPtParams {
  /** The address to receive the output of the action */
  receiver: string;
  /** Max slippage accepted. A value from 0 to 1 (0.01 is 1%) */
  slippage: number;
  /** The market address of the new PT */
  dstMarket: string;
  ptAmount: string;
  chainId: number;
  market: string;
}

export type PendleSdkControllerRollOverPtData = PendleRollOverPtResponse;

export interface PendleSdkControllerAddLiquidityDualParams {
  /** The address to receive the output of the action */
  receiver: string;
  /** Max slippage accepted. A value from 0 to 1 (0.01 is 1%) */
  slippage: number;
  /** Address can be token / SY */
  tokenIn: string;
  amountTokenIn: string;
  amountPtIn: string;
  chainId: number;
  market: string;
}

export type PendleSdkControllerAddLiquidityDualData =
  PendleAddLiquidityDualResponse;

export interface PendleSdkControllerRemoveLiquidityDualParams {
  /** The address to receive the output of the action */
  receiver: string;
  /** Max slippage accepted. A value from 0 to 1 (0.01 is 1%) */
  slippage: number;
  amountIn: string;
  /** Address can be token / SY */
  tokenOut: string;
  chainId: number;
  market: string;
}

export type PendleSdkControllerRemoveLiquidityDualData =
  PendleRemoveLiquidityDualResponse;

export interface PendleSdkControllerCancelSingleLimitOrderParams {
  /** User Address */
  userAddress: string;
  /** BigInt string of salt */
  salt: string;
  /** BigInt string of expiry */
  expiry: string;
  /** BigInt string of nonce */
  nonce: string;
  /** LimitOrderType { 0 : TOKEN_FOR_PT, 1 : PT_FOR_TOKEN, 2 : TOKEN_FOR_YT, 3 : YT_FOR_TOKEN } */
  orderType: 0 | 1 | 2 | 3;
  /** Token used by user to make order */
  token: string;
  /** YT address */
  YT: string;
  /** Maker address */
  maker: string;
  /** Receiver address */
  receiver: string;
  /** BigInt string of making amount */
  makingAmount: string;
  /** BigInt string of lnImpliedRate */
  lnImpliedRate: string;
  /** BigInt string of failSafeRate */
  failSafeRate: string;
  /** Bytes string for permit */
  permit: string;
  chainId: number;
}

export type PendleSdkControllerCancelSingleLimitOrderData = PendleSdkResponse;

export interface PendleSdkControllerCancelAllLimitOrdersParams {
  /** User Address */
  userAddress: string;
  chainId: number;
}

export type PendleSdkControllerCancelAllLimitOrdersData = PendleSdkResponse;

export type PendleSdkControllerPendleSwapData = PendlePendleSwapResponse;

export interface PendleSdkControllerExitMarketParams {
  /** The address to receive the output of the action */
  receiver: string;
  /** Max slippage accepted. A value from 0 to 1 (0.01 is 1%) */
  slippage: number;
  /**
   * Enable swap aggregator to swap between tokens that cannot be natively converted from/to the underlying asset
   * @default false
   */
  enableAggregator?: boolean;
  ptAmount: string;
  ytAmount: string;
  lpAmount: string;
  /** Address can be token / SY */
  tokenOut: string;
  chainId: number;
  market: string;
}

export type PendleSdkControllerExitMarketData = any;

export interface PendleSdkControllerRedeemInterestsAndRewardsParams {
  /** The address to receive the output of the action */
  receiver: string;
  /** Use comma separated values to search by multiple addresses */
  sys?: string;
  /** Use comma separated values to search by multiple addresses */
  yts?: string;
  /** Use comma separated values to search by multiple addresses */
  markets?: string;
  chainId: number;
}

export type PendleSdkControllerRedeemInterestsAndRewardsData =
  PendleRedeemInterestsAndRewardsResponse;

export interface PendleMarketsControllerMarketApyHistoryV2Params {
  /** @default "hour" */
  time_frame?: "hour" | "day" | "week";
  /**
   * Should be rounded up to time frame (in UTC)
   * @format date-time
   */
  timestamp_start?: string;
  /**
   * Should be rounded up to time frame (in UTC)
   * @format date-time
   */
  timestamp_end?: string;
  chainId: number;
  address: `0x${string}`;
}

export type PendleMarketsControllerMarketApyHistoryV2Data =
  PendleMarketApyHistoriesCSVResponse;

export interface PendleMarketsControllerMarketsParams {
  /**
   * Sort by field: 1 for ascending, -1 for descending
   * @example "name:1"
   */
  order_by?: string;
  /**
   * Number of results to skip. The parameter is capped at 300.
   * @default 0
   */
  skip?: number;
  /**
   * Maximum number of results to return. The parameter is capped at 100.
   * @default 10
   */
  limit?: number;
  is_expired?: boolean;
  /** Filter markets by whitelist simple, pro or show all markets. Default select is set to pro. Possible values: all, pro and simple */
  select?: string;
  pt?: string;
  yt?: string;
  sy?: string;
  /** Search by address, name or symbol */
  q?: string;
  is_active?: boolean;
  /** category id */
  categoryId?: string;
  chainId: number;
}

export type PendleMarketsControllerMarketsData = PendleMarketsResponse;

export interface PendleMarketsControllerGetFeaturedMarketsParams {
  /**
   * Sort by field: 1 for ascending, -1 for descending
   * @example "name:1"
   */
  order_by?: string;
  /**
   * Number of results to skip. The parameter is capped at 300.
   * @default 0
   */
  skip?: number;
  /**
   * Maximum number of results to return. The parameter is capped at 100.
   * @default 10
   */
  limit?: number;
  chainId: number;
}

export type PendleMarketsControllerGetFeaturedMarketsData =
  PendleFeaturedMarketsResponseEntity;

export type PendleMarketsControllerMarketData = PendleMarketResponse;

export interface PendleMarketsControllerMarketDataV2Params {
  /** @format date-time */
  timestamp?: string;
  chainId: number;
  address: `0x${string}`;
}

export type PendleMarketsControllerMarketDataV2Data = PendleMarketDataResponse;

export interface PendleMarketsControllerMarketHistoryV2Params {
  /** @default "hour" */
  time_frame?: "hour" | "day" | "week";
  /**
   * Should be rounded up to time frame (in UTC)
   * @format date-time
   */
  timestamp_start?: string;
  /**
   * Should be rounded up to time frame (in UTC)
   * @format date-time
   */
  timestamp_end?: string;
  chainId: number;
  address: `0x${string}`;
}

export type PendleMarketsControllerMarketHistoryV2Data =
  PendleMarketHistoriesResponse;

export interface PendleMarketsControllerMarketApyHistoryParams {
  /** @default "hour" */
  time_frame?: "hour" | "day" | "week";
  /**
   * Should be rounded up to time frame (in UTC)
   * @format date-time
   */
  timestamp_start?: string;
  /**
   * Should be rounded up to time frame (in UTC)
   * @format date-time
   */
  timestamp_end?: string;
  chainId: number;
  address: `0x${string}`;
}

export type PendleMarketsControllerMarketApyHistoryData =
  PendleMarketApyHistoriesResponse;

export interface PendleMarketsControllerMarketStateHistoryParams {
  /** @default "hour" */
  time_frame?: "hour" | "day" | "week";
  /**
   * Should be rounded up to time frame (in UTC)
   * @format date-time
   */
  timestamp_start?: string;
  /**
   * Should be rounded up to time frame (in UTC)
   * @format date-time
   */
  timestamp_end?: string;
  chainId: number;
  address: `0x${string}`;
}

export type PendleMarketsControllerMarketStateHistoryData =
  PendleGetMarketStatHistoryCSVResponse;

export interface PendleMarketsControllerMarketApyHistoryV3Params {
  /** @default "hour" */
  time_frame?: "hour" | "day" | "week";
  /**
   * Should be rounded up to time frame (in UTC)
   * @format date-time
   */
  timestamp_start?: string;
  /**
   * Should be rounded up to time frame (in UTC)
   * @format date-time
   */
  timestamp_end?: string;
  chainId: number;
  address: `0x${string}`;
}

export type PendleMarketsControllerMarketApyHistoryV3Data =
  PendleMarketHistoricalDataTableResponse;

export interface PendleMarketsControllerMarketApyHistory1DParams {
  /** @default "hour" */
  time_frame?: "hour" | "day" | "week";
  /**
   * Should be rounded up to time frame (in UTC)
   * @format date-time
   */
  timestamp_start?: string;
  /**
   * Should be rounded up to time frame (in UTC)
   * @format date-time
   */
  timestamp_end?: string;
  chainId: number;
  address: `0x${string}`;
}

export type PendleMarketsControllerMarketApyHistory1DData =
  PendleMarketApyHistoriesCSVResponse;

export interface PendleMarketsControllerMarketImpliedApyChartParams {
  /**
   * Time start should be within the last 2 days of current time. Default to 2 days ago
   * @format date-time
   */
  timestamp_start?: string;
  /**
   * Time end should be within the last 2 days of current time. Default to now
   * @format date-time
   */
  timestamp_end?: string;
  chainId: number;
  address: `0x${string}`;
}

export type PendleMarketsControllerMarketImpliedApyChartData =
  PendleMarketImpliedApyResponseEntity;

export type PendleMarketsControllerMarketAssetsData =
  PendleMarketAssetsResponse;

export interface PendleMarketsControllerGetSwapAmountToChangeImpliedApyParams {
  /** Address can be token / SY / PT or YT */
  tokenIn: string;
  /** Address can be token / SY / PT or YT */
  tokenOut: string;
  /** Target implied apy */
  targetImpliedApy: number;
  chainId: number;
  address: `0x${string}`;
}

export type PendleMarketsControllerGetSwapAmountToChangeImpliedApyData =
  PendleSwapAmountToChangeApyResponse;

export type PendleMarketCategoriesControllerFindAllMarketCategoriesData =
  PendleGetAllMarketCategoriesResponse;

export type PendleUtilizedProtocolsControllerFindAllUtilizedProtocolsData =
  PendleGetAllUtilizedProtocolsResponse;

export type PendleUtilizedProtocolsControllerGetUtilizedProtocolsOfMarketData =
  PendleUtilizedProtocolResponse[];

export interface PendleAssetsControllerAssetsParams {
  /**
   * Sort by field: 1 for ascending, -1 for descending
   * @example "name:1"
   */
  order_by?: string;
  /**
   * Number of results to skip. The parameter is capped at 1000.
   * @default 0
   */
  skip?: number;
  /**
   * Maximum number of results to return. The parameter is capped at 50.
   * @default 10
   */
  limit?: number;
  is_expired?: boolean;
  zappable?: boolean;
  /** Use comma separated values to search by multiple values. Possible values are NATIVE, GENERIC, LP, IB, PENDLE_LP, SY, PT and YT */
  type?: string;
  /** Use comma separated values to search by multiple addresses */
  address?: `0x${string}`;
  /** Search by address, name, symbol or protocol */
  q?: string;
  chainId: number;
}

export type PendleAssetsControllerAssetsData = PendleAssetsResponse;

export type PendleAssetsControllerAllAssetsData = PendleAssetResponse[];

export type PendleAssetsControllerAllAssetsV2Data = PendleAssetCSVResponse;

export type PendleAssetsControllerAssetData = PendleAssetResponse;

export type PendleAssetsControllerGetAllPendleTokensInUniswapFormatData =
  PendleUniswapTokenListResponse;

export type PendleSysControllerWhitelistedSysData =
  PendleWhitelistedSysResponse;

export type PendleSysControllerAssetSyData = PendleSyResponse;

export interface PendleVePendleControllerVoteSnapshotParams {
  /** @format date-time */
  epoch?: string;
}

export type PendleVePendleControllerVoteSnapshotData =
  PendleVoteSnapshotResponse;

export interface PendleVePendleControllerPoolVoterApyParams {
  /** @example "voterApy:-1" */
  order_by?: string;
}

export type PendleVePendleControllerPoolVoterApyData =
  PendlePoolVoterApysResponse;

export interface PendleVePendleControllerGetPoolVoterAprAndSwapFeeParams {
  /** @example "voterApr:-1" */
  order_by?: string;
}

export type PendleVePendleControllerGetPoolVoterAprAndSwapFeeData =
  PendlePoolVoterAprsSwapFeesResponse;

export type PendleVePendleControllerPoolMetadataData = PendlePoolResponse[];

export interface PendleVePendleControllerVoterApyChartParams {
  /** @default "hour" */
  time_frame?: "hour" | "day" | "week";
  /** @format date-time */
  timestamp_gte?: string;
  /** @format date-time */
  timestamp_lte?: string;
}

export type PendleVePendleControllerVoterApyChartData =
  PendleVoterApyChartResponse;

export interface PendleVePendleControllerVePendleApyChartParams {
  /** @default "hour" */
  time_frame?: "hour" | "day" | "week";
  /** @format date-time */
  timestamp_gte?: string;
  /** @format date-time */
  timestamp_lte?: string;
}

export type PendleVePendleControllerVePendleApyChartData =
  PendleVePendleApyChartResponse;

export type PendleVePendleControllerPendleTokenSupplyData =
  PendlePendleTokenSupplyResponse;

export interface PendleVePendleControllerGetHistoricalVotesParams {
  /** @format date-time */
  timestamp?: string;
  address: `0x${string}`;
}

export type PendleVePendleControllerGetHistoricalVotesData =
  PendleGetHistoricalVotesResponse;

export interface PendleVePendleControllerAllMarketTotalFeesParams {
  /**
   * Should be rounded up to time frame (in UTC)
   * @format date-time
   */
  timestamp_start?: string;
  /**
   * Should be rounded up to time frame (in UTC)
   * @format date-time
   */
  timestamp_end?: string;
}

export type PendleVePendleControllerAllMarketTotalFeesData =
  PendleAllMarketTotalFeesResponse;

export type PendleVePendleControllerOngoingVotesData =
  PendleGetOngoingVotesResponse;

export type PendlePendleControllerPendleSupplyData = any;

export type PendlePendleControllerPendleCirculatingSupplyData = any;

export interface PendlePricesControllerOhlcvV4Params {
  /** @default "hour" */
  time_frame?: "hour" | "day" | "week";
  /**
   * Should be rounded up to time frame (in UTC)
   * @format date-time
   */
  timestamp_start?: string;
  /**
   * Should be rounded up to time frame (in UTC)
   * @format date-time
   */
  timestamp_end?: string;
  chainId: number;
  address: `0x${string}`;
}

export type PendlePricesControllerOhlcvV4Data = PendlePriceOHLCVCSVResponse;

export type PendlePricesControllerGetAllAssetPricesData =
  PendleAssetPricesResponse;

export interface PendlePricesControllerGetAllAssetPricesByAddressesParams {
  /** Use comma separated values to search by multiple addresses. Upto 50 addresses allowed */
  addresses?: string;
  chainId: number;
}

export type PendlePricesControllerGetAllAssetPricesByAddressesData =
  PendleAssetPricesResponse;

export interface PendlePricesControllerVolumeByMarketParams {
  /** @default "hour" */
  time_frame?: "hour" | "day" | "week";
  /**
   * Should be rounded up to time frame (in UTC)
   * @format date-time
   */
  timestamp_start?: string;
  /**
   * Should be rounded up to time frame (in UTC)
   * @format date-time
   */
  timestamp_end?: string;
  /**
   * pt or yt
   * @default "pt"
   */
  type: "pt" | "yt";
  chainId: number;
  address: `0x${string}`;
}

export type PendlePricesControllerVolumeByMarketData =
  PendlePriceOHLCVCSVResponse;

export interface PendlePricesControllerNotionalVolumeByMarketParams {
  /** @default "hour" */
  time_frame?: "hour" | "day" | "week";
  /**
   * Should be rounded up to time frame (in UTC)
   * @format date-time
   */
  timestamp_start?: string;
  /**
   * Should be rounded up to time frame (in UTC)
   * @format date-time
   */
  timestamp_end?: string;
  chainId: number;
  address: `0x${string}`;
}

export type PendlePricesControllerNotionalVolumeByMarketData =
  PendleNotionalVolumeResponse;

export interface PendlePricesControllerOhlcvV2Params {
  /** @default "hour" */
  time_frame?: "hour" | "day" | "week";
  /**
   * Should be rounded up to time frame (in UTC)
   * @format date-time
   */
  timestamp_start?: string;
  /**
   * Should be rounded up to time frame (in UTC)
   * @format date-time
   */
  timestamp_end?: string;
  chainId: number;
  address: `0x${string}`;
}

export type PendlePricesControllerOhlcvV2Data = PendlePriceOHLCVResponse;

export interface PendlePricesControllerOhlcvV3Params {
  /** @default "hour" */
  time_frame?: "hour" | "day" | "week";
  /**
   * Should be rounded up to time frame (in UTC)
   * @format date-time
   */
  timestamp_start?: string;
  /**
   * Should be rounded up to time frame (in UTC)
   * @format date-time
   */
  timestamp_end?: string;
  chainId: number;
  address: `0x${string}`;
}

export type PendlePricesControllerOhlcvV3Data = PendlePriceOHLCVResponse;

export interface PendleTransactionsControllerTransactionsV3Params {
  market: string;
  /**
   * Number of results to skip for pagination. Limited to max 2000. For larger result sets, use version 4.
   * @default 0
   */
  skip?: number;
  /**
   * Maximum number of results to return. The parameter is capped at 1000.
   * @default 10
   */
  limit?: number;
  /** Use comma separated values to search by multiple values. Possible values are MINT_PY, REDEEM_PY, ADD_LIQUIDITY, REMOVE_LIQUIDITY, SWAP_PT, SWAP_YT and SWAP_PY */
  action?: string;
  /** Use comma separated values to search by multiple values. Possible values are ROUTER, PENDLE_MARKET and YT */
  origin?: string;
  /** @format date-time */
  timestamp_start?: string;
  /** @format date-time */
  timestamp_end?: string;
  user?: string;
  minValue?: number;
  maxValue?: number;
  chainId: number;
}

export type PendleTransactionsControllerTransactionsV3Data =
  PendleTransactionsResponse;

export interface PendleTransactionsControllerTransactionsV4Params {
  market?: string;
  /**
   * Number of results to skip for pagination. Limited to max 5000. For larger result sets, use resume token instead.
   * @default 0
   */
  skip?: number;
  /**
   * Maximum number of results to return. The parameter is capped at 1000.
   * @default 10
   */
  limit?: number;
  /** Use comma separated values to search by multiple values. Possible values are MINT_PY, REDEEM_PY, ADD_LIQUIDITY, REMOVE_LIQUIDITY, SWAP_PT, SWAP_YT and SWAP_PY */
  action?: string;
  /** Use comma separated values to search by multiple values. Possible values are ROUTER, PENDLE_MARKET and YT */
  origin?: string;
  /** @format date-time */
  timestamp_start?: string;
  /** @format date-time */
  timestamp_end?: string;
  user?: string;
  minValue?: number;
  maxValue?: number;
  /** Resume token for pagination. Use this to continue a previous query. */
  resumeToken?: string;
  chainId: number;
}

export type PendleTransactionsControllerTransactionsV4Data =
  PendleTransactionsV4Response;

export interface PendleTransactionsControllerTransactionsV5Params {
  /** Transaction type. Possible values are TRADES and LIQUIDITY */
  type: string;
  /**
   * Number of results to skip. The parameter is capped at 1000.
   * @default 0
   */
  skip?: number;
  /**
   * Maximum number of results to return. The parameter is capped at 1000.
   * @default 10
   */
  limit?: number;
  minValue?: number;
  /** Address, who execute the transaction */
  txOrigin?: string;
  /** Transaction action. Possible values are LONG_YIELD, SHORT_YIELD, ADD_LIQUIDITY, REMOVE_LIQUIDITY */
  action?: string;
  chainId: number;
  address: `0x${string}`;
}

export type PendleTransactionsControllerTransactionsV5Data =
  PendleTransactionsV5Response;

export type PendleTransactionsControllerTransactionData =
  PendleTransactionResponse;

export type PendleMetadataControllerGetValuesByKeysData =
  PendleMetadataResponse;

export type PendleMetadataControllerGetValuesByKeysV2ByPostData =
  PendleMetadataResponse;

export interface PendleMetadataControllerGetValuesByKeysV2ByGetParams {
  keys: string[];
}

export type PendleMetadataControllerGetValuesByKeysV2ByGetData =
  PendleMetadataValuesResponse;

export type PendleMetadataControllerGetMetadataValuesByTemplateData =
  PendleGetMetadataByTemplateResponse;

export type PendleStatisticsControllerGetTvlAndTradingVolumeData =
  PendleTvlAndTradingVolumeResponseEntity;

export interface PendleStatisticsControllerGetDistinctUserFromTokenParams {
  token: string;
  /** Filter by chain id if specified */
  chainId?: number;
}

export type PendleStatisticsControllerGetDistinctUserFromTokenData =
  PendleGetDistinctUsersFromTokenEntity;

export interface PendleMerkleControllerGetRewardsByAddressParams {
  /**
   * The chainId of the chain to get rewards from
   * @default 1
   */
  chainId?: number;
  address: `0x${string}`;
  campaign: "vependle" | "arbitrum-grant" | "multi-token" | "external-rewards";
}

export type PendleMerkleControllerGetRewardsByAddressData =
  PendleMerkleRewardsResponse;

export interface PendleMerkleControllerGetProofByAddressParams {
  /**
   * Set to true to generate calldata to verify merkle root in the PendleMerkleDistributor contract
   * @default false
   */
  generateVerifyData?: boolean;
  /**
   * The chainId of the chain to verify the merkle root on
   * @default 1
   */
  chainId?: number;
  address: `0x${string}`;
  campaign: "vependle" | "arbitrum-grant" | "multi-token" | "external-rewards";
}

export type PendleMerkleControllerGetProofByAddressData =
  PendleMerkleProofResponse;

export interface PendleMerkleControllerGetProofByAddressV2Params {
  /**
   * Set to true to generate calldata to verify merkle root in the PendleMerkleDistributor contract
   * @default false
   */
  generateVerifyData?: boolean;
  address: `0x${string}`;
}

export type PendleMerkleControllerGetProofByAddressV2Data =
  PendleMerkleProofV2Response;

export type PendleTransferLiquidityControllerGetDefaultTokenOutListData =
  PendleSyTokenOutRouteListResponse;

export type PendleTransferLiquidityControllerGetLiquidityTransferableMarketsData =
  PendleGetLiquidityTransferableMarketsResponse;

export interface PendleQuerierControllerGetSimplifiedDataParams {
  isExpired?: boolean;
}

export type PendleQuerierControllerGetSimplifiedDataData =
  PendleGetSimplifiedDataResponse;

export type PendleChainsControllerGetSupportedChainIdsData =
  PendleChainIdsResponse;

export interface PendleDashboardControllerGetUserPositionsParams {
  /**
   * Minimum USD value threshold to filter positions
   * @example 0.1
   */
  filterUsd?: number;
  /** Ethereum address of the user */
  user: string;
}

export type PendleDashboardControllerGetUserPositionsData =
  PendleUserPositionsCrossChainResponse;
