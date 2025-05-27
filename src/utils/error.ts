import type {AxiosError} from "axios";
// import type {H3Error} from "h3";

export function getErrorText(error: Error|string|unknown, startErrorText = 'Error: ') {
    if (!error) {
        return '';
    }
    const errorText = typeof error === 'string' ? error : extractErrorText(error);
    // don't add startErrorText if errorText contains 'error'
    let bothHasError;
    if (typeof startErrorText === 'string' && startErrorText.toLowerCase().indexOf('error') >= 0) {
        if (errorText.toLowerCase().indexOf('error') >= 0) {
            bothHasError = true;
        }
    }
    return bothHasError ? errorText : startErrorText + errorText;
}

function extractErrorText(error: AxiosError|Error|unknown): string {
    if (typeof error !== 'object' || error === null) {
        throw new Error('extractErrorText: not an error object passed');
    }

    const axiosError = error as AxiosError<{detail?: string, message?: string, error?: string}>;
    if (axiosError.response?.data?.detail) {
        return axiosError.response.data.detail;
    }
    if (axiosError.response?.data?.message) {
        return axiosError.response.data.message;
    }
    if (axiosError.response?.data?.error) {
        return axiosError.response.data.error;
    }
    // handle nuxt errors
    // const h3Error = error as H3Error<{ error?: { message: string } }>;
    // if (h3Error.data?.error?.message) {
    //     return h3Error.data.error.message;
    // }
    if ('message' in error && typeof error.message === 'string' && error.message) {
        // network error
        return error.message;
    } else {
        return 'Something went wrong';
    }
}
