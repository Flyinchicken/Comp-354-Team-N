const naturalLog = require("./naturalLog.js");

/**
 * Calculate the logarithm of x with a specific base
 * @param {number} x Point at which we want to calculate
 * @param {number} base Base of the logarithm
 * @returns {number} Value of the hyperbolic sin at x
 */
function log(x, base) {
  // check for invalid input
  if (x <= 0 || base <= 0 || base === 1) {
    return NaN;
  }
  
  return naturalLog(x)/naturalLog(base);
}

module.exports = log;
