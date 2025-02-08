import decode from 'entity-decode';
import prettyNum, { PRECISION_SETTING, ROUNDING_MODE } from 'pretty-num';

/**
 * Format a number with specified precision and settings
 * @param {string|number} value - The value to format
 * @param {number} precision - Number of decimal places
 * @param {PRECISION_SETTING} [precisionSetting] - Precision setting mode
 * @return {string} Formatted number
 */
export function prettyNumber(value: string | number, precision: number, precisionSetting?: PRECISION_SETTING): string {
    return decode(
        prettyNum(value, {
            precision,
            precisionSetting,
            roundingMode: ROUNDING_MODE.FLOOR,
            separateOneDigit: false,
            thousandsSeparator: '&#x202F;'
        })
    );
}

/**
 * Format a number with adaptive precision
 * @param {string|number} value - The value to format
 * @param {boolean} [reducePrecision]
 * @return {string} Formatted number
 */
export function pretty(value: string | number, reducePrecision?: boolean): string {
    if (!value && value !== 0) {
        return '';
    }
    const PRECISION = 2;
    const PRECISION_SIGNIFICANT = 3;
    if (+value > 0.3 || +value <= -0.3 || Number(value) === 0) {
        return prettyNumber(
            value,
            PRECISION,
            reducePrecision ? PRECISION_SETTING.REDUCE : PRECISION_SETTING.FIXED,
        );
    } else {
        let formattedValue = prettyNumber(value, PRECISION_SIGNIFICANT, PRECISION_SETTING.REDUCE_SIGNIFICANT);
        formattedValue = formattedValue.substring(0, 10);
        if (formattedValue === '0.00000000') {
            return '0.00';
        }
        return formattedValue;
    }
}

/**
 * Format a number as USD with 2 decimal places
 * @param {string|number} value - The value to format
 * @return {string} Formatted USD number
 */
export function prettyUsd(value: string | number): string {
    return prettyNumber(value, 2, PRECISION_SETTING.FIXED);
}

/**
 * Round a number to the nearest integer
 * @param {string|number} value - The value to round
 * @return {string} Rounded number
 */
export function prettyRound(value: string | number): string {
    return prettyNumber(value, 0, PRECISION_SETTING.FIXED);
}
