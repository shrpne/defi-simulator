import { ref, watch, getCurrentScope, onScopeDispose } from 'vue';
import type { Ref, WatchSource, MultiWatchSources } from 'vue'


export type AsyncDataRequestStatus = 'idle' | 'pending' | 'success' | 'error';

export interface AsyncActionResult<TData, TArgs extends Array<unknown>, TError> {
    execute: (...args: TArgs) => Promise<void>
    data: Ref<TData | undefined>
    status: Ref<AsyncDataRequestStatus>
    error: Ref<TError | undefined>
    currentArgs: Ref<TArgs>
    currentArg1: Ref<TArgs[0]>
}

export type AsyncActionOptions = {
    immediate?: boolean
    watch?: WatchSource | MultiWatchSources
    dedupe?: 'cancel' | 'defer'
}

export default function useAsyncAction<
    TData,
    TArgs extends Array<unknown>,
    TError extends Error = Error,
>(
    fn: (...args: TArgs) => Promise<TData>,
    options: AsyncActionOptions = {},
): AsyncActionResult<TData, TArgs, TError> {
    const dedupe = options.dedupe ? options.dedupe : 'defer';

    const data = ref<TData | undefined>();
    const error = ref<TError | undefined>();
    const status = ref<AsyncDataRequestStatus>('idle');
    const currentArgs = ref<TArgs>([] as unknown as TArgs) as Ref<TArgs>;
    const currentArg1 = ref<TArgs[0]>();

    let list: Array<Promise<void>> = [];

    function handleDedupeOnFulfillment(promise: Promise<void>) {
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

    if (options.immediate) {
        execute(...([] as unknown as TArgs));
    }

    const hasScope = getCurrentScope();
    if (options.watch) {
        const unSubscribe = watch(options.watch, () => execute(...([] as unknown as TArgs)));
        if (hasScope) {
            onScopeDispose(unSubscribe)
        }
    }

    return { execute, data, error, status, currentArgs, currentArg1 };
}
