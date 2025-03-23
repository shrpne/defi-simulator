import camelcaseKeys from 'camelcase-keys';
import decamelizeKeys from 'decamelize-keys';
import type { AxiosInstance } from 'axios';

export function toCamel(obj: Record<string, unknown>) {
    return camelcaseKeys(obj, {deep: true});
}

export function fromCamel(obj: Record<string, unknown>) {
    return decamelizeKeys(obj, {deep: true});
}

/**
 *
 * @param {import('axios').AxiosInstance} instance
 */
export default function addToCamelInterceptor(instance: AxiosInstance) {
    instance.interceptors.response.use(function(response) {
        response.data = toCamel(response.data);
        return response;
    }, function(error) {
        if (error.response && error.response.data) {
            error.response.data = toCamel(error.response.data);
        }
        return Promise.reject(error);
    });

    instance.interceptors.request.use(function(config) {
        if (typeof config.data === 'object') {
            config.data = fromCamel(config.data);
        }
        return config;
    })
}
