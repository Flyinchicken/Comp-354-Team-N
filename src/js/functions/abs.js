/**
 * Calculate the absolute value of a number
 * @param {number} num Number that we want to absolute value of
 * @returns {number} Positive number
 */
function abs(num) {
    return (num < 0) ? -num : num;
}

module.exports = abs;