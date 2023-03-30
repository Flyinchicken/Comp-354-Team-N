/**
 * Exponentiation function that raises the base to the given exponent.
 * @param {number} base The number to be raised
 * @param {number} exponent The power to which the base should be raised
 * @returns {string} result of the base raised to the exponent
 */
function exponentiation(base, exponent) {
    if (exponent === 0) {
        if (base === 0) {
            return NaN;
        }
        return 1;
    }
    if (exponent < 0) {
        if (base === 0) {
            return NaN;
        }
        exponent = - exponent;
        base = 1 / base;
    }
    let result = base;
    for (let i = 1; i < exponent; i++) {
        result *= base;
    }
    result = formatToMinDecPlaces(result);
    return result;
}

/**
 * Formats the number with the minimum and maximum number of required decimal places
 * @param {number} resultToFormat The number to format
 * @param {number} minDecPlaces Minimum number of decimal places required
 * @param {number} maxDecPlaces Maximum number of decimal places required
 * @returns {string} formattedResult in the specified format
 */
function formatToMinDecPlaces(resultToFormat, minDecPlaces = 4, maxDecPlaces = 8) {
    let formattedResult = resultToFormat.toFixed(minDecPlaces);
    let resultToFormatString = resultToFormat.toString();
    if (resultToFormatString.length > formattedResult.length) {
        resultToFormat = resultToFormat.toFixed(maxDecPlaces);
        formattedResult = resultToFormat;
    }
    return formattedResult;
}

module.exports = exponentiation
