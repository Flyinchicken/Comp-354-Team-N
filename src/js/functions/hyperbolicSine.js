const naturalExponentiation = require("./naturalExponentiation.js");

/**
 * Calculate the hyperbolic sin at a given point
 * @param {number} x Point at which we want to calculate
 * @returns {number} Value of the hyperbolic sin at x
 */

function hyperbolicSine(x) {    
    let result = (naturalExponentiation(x) - naturalExponentiation(-x))/2;
    
    return parseFloat(result.toPrecision(10));
}
module.exports = hyperbolicSine;
