import { ref, watch, getCurrentScope, onScopeDispose } from 'vue';
import type { Ref, WatchSource, MultiWatchSources } from 'vue';


export type AsyncDataRequestStatus = 'idle' | 'pending' | 'success' | 'error';

export interface AsyncActionResult<TData, TError> {
    execute: () => Promise<TData | undefined>
    ensure: () => Promise<TData | undefined>
    data: Ref<TData | undefined>
    status: Ref<AsyncDataRequestStatus>
    error: Ref<TError | undefined>
}

export type AsyncActionOptions = {
    immediate?: boolean
    watch?: WatchSource | MultiWatchSources
    dedupe?: 'cancel' | 'defer'
}

export default function useAsyncAction<
    TData,
    TError extends Error = Error,
>(
    fn: () => Promise<TData>,
    options: AsyncActionOptions = {},
): AsyncActionResult<TData, TError> {
    const dedupe = options.dedupe ? options.dedupe : 'defer';

    const data = ref<TData | undefined>();
    const error = ref<TError | undefined>();
    const status = ref<AsyncDataRequestStatus>('idle');

    let list: Array<Promise<TData | undefined>> = [];
    let lastPromise: Promise<TData | undefined> | undefined;

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

    const execute = async () => {
        if (dedupe === 'defer' && status.value === 'pending') {
            return list[0];
        }

        // run fn before updating status
        const promise = fn()
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
        lastPromise = promise;
        list.push(promise);
        return promise;
    };

    const ensure = () => {
        if (lastPromise) {
            return lastPromise;
        }
        return execute();
    }

    if (options.immediate) {
        execute();
    }

    const hasScope = getCurrentScope();
    if (options.watch) {
        const unSubscribe = watch(options.watch, () => execute());
        if (hasScope) {
            onScopeDispose(unSubscribe)
        }
    }

    return { execute, ensure, data, error, status };
}
