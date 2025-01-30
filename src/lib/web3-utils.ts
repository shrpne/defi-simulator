import { encodeFunctionData, erc20Abi, parseUnits } from 'viem';
import type { TransactionRequestBase, Hex } from 'viem';

type RequiredNotNull<T> = {
    [P in keyof T]: NonNullable<T[P]>
}

export function buildApproveTx(
    tokenAddress: `0x${string}`,
    spender: `0x${string}`,
    amount: number|string|bigint // in wei
): Required<RequiredNotNull<Pick<TransactionRequestBase, 'to' | 'data' /*| 'value'*/>>> {
    // Encode the function call
    const data = encodeFunctionData({
        abi: erc20Abi,
        functionName: 'approve',
        args: [spender, BigInt(amount)],
    });

    return {
        to: tokenAddress,
        data,
        // value: 0n,
    };
}

export function encodeApproveData(
    spender: `0x${string}`,
    amount: number | string | bigint // in wei
) {
    return encodeFunctionData({
        abi: erc20Abi,
        functionName: 'approve',
        args: [spender, BigInt(amount)],
    })
}



// function buildTransferTx(tokenContractAddress, recipientAddress, amount) {
//     const data = encodeFunctionData({
//         abi: erc20Abi,
//         functionName: 'transfer',
//         args: [recipientAddress, amount],
//     });
//
//     return {
//         to: tokenContractAddress,
//         data,
//         value: '0',
//     };
// }
