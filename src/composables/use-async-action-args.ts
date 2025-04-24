import { ref } from 'vue';
import type { Ref } from 'vue'
import type { AsyncActionOptions, AsyncDataRequestStatus } from './use-async-action.ts'

export interface AsyncActionResult<TData, TArgs extends Array<unknown>, TError> {
    execute: (...args: TArgs) => Promise<TData | undefined>
    data: Ref<TData | undefined>
    status: Ref<AsyncDataRequestStatus>
    error: Ref<TError | undefined>
    currentArgs: Ref<TArgs>
    currentArg1: Ref<TArgs[0]>
}


export default function useAsyncActionWithArgs<
    TData,
    TArgs extends Array<unknown>,
    TError extends Error = Error,
>(
    fn: (...args: TArgs) => Promise<TData>,
    options: Pick<AsyncActionOptions, 'dedupe'> = {},
): AsyncActionResult<TData, TArgs, TError> {
    const dedupe = options.dedupe ? options.dedupe : 'defer';

    const data = ref<TData | undefined>();
    const error = ref<TError | undefined>();
    const status = ref<AsyncDataRequestStatus>('idle');
    const currentArgs = ref<TArgs>([] as unknown as TArgs) as Ref<TArgs>;
    const currentArg1 = ref<TArgs[0]>();

    let list: Array<Promise<TData | undefined>> = [];

    function handleDedupeOnFulfillment(promise: Promise<TData | undefined>) {
        if (dedupe === 'cancel') {
            // check if current promise not the last one
            if (list.indexOf(promise) !== list.length - 1) {
                // if not last - wait for last
                return {
                    canceledWith: list[list.length - 1],
                };
            }
            // {1}
            /* else {
                list = [];
                return {};
            }*/
        }
        // {2} with defer, list will have no more than 1 item at a time
        /*if (dedupe === 'defer') {
            list = [];
            return {};
        }*/

        // same as {1} and {2} but TS handles it better
        list = [];
        return { canceledWith: undefined };
    }

    const execute = async (...args: TArgs) => {
        if (dedupe === 'defer' && status.value === 'pending') {
            return list[0];
        }

        // run fn before updating status
        const promise = fn(...args)
            .then((result) => {
                const { canceledWith } = handleDedupeOnFulfillment(promise);
                if (canceledWith) {
                    return canceledWith;
                }
                data.value = result;
                error.value = undefined;
                status.value = 'success';
                return result;
            })
            .catch((e) => {
                const { canceledWith } = handleDedupeOnFulfillment(promise);
                if (canceledWith) {
                    return canceledWith;
                }
                // data.value = undefined;
                error.value = e as TError;
                status.value = 'error';
            });


        status.value = 'pending';
        currentArgs.value = args;
        currentArg1.value = args[0];
        list.push(promise);
        return promise;
    };

    return { execute, data, error, status, currentArgs, currentArg1 };
}
