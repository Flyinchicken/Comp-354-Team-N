const naturalExponentiation = require("./naturalExponentiation.js");
const naturalLog = require("./naturalLog.js");

/**
 * Exponentiation function that raises the base to the given exponent.
 * @param {number} base The number to be raised
 * @param {number} exponent The power to which the base should be raised
 * @returns {string} result of the base raised to the exponent
 */
function exponentiation(base, exponent) {

    base = parseFloat(base);
    exponent = parseFloat(exponent);
    if (base === 0 && exponent <= 0)
        return NaN;
    
    if (base === 0) 
        return 0;

    if (base === 1 || exponent === 0) 
        return 1;

    if (exponent === 1) 
        return base;

    if (!Number.isInteger(exponent)) {
        if (base === 1 / Math.E) 
            exponent = - exponent;
         else if (base !== Math.E) 
            exponent = exponent * naturalLog(base);
        
        return naturalExponentiation(exponent);
    }

    if (exponent < 0) {
        exponent = - exponent;
        base = 1 / base;
    }

    let result = base;
    for (let i = 1; i < exponent; i++) {
        result *= base;
    }
    
    return result;
}

module.exports = exponentiation
