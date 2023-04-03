const exponentiation = require("./exponentiation")

/**
 * Analysis:
 * f(x) = ab^x
 * In this function, the dependent variable f(x) changes exponentially as x increases. 
 * “a” is often referred to as the initial amount. This is because when x = 0, f(x) = a.
 * “b” is known as the growth/decay facture which determines if the function is increasing or decreasing and by how much.  
 * Often this function is used to describe population growth, assets/investment growth and decay amongst others.
 * 
 * Pseudocode:
 * Input: initialValue, growthFactor, xValue
 * growth = growthFactor^x
 * result = growth*initialValue
 * return result
 * 
 * Calculate the exponential growth at point x given growth factor and initial value
 * @param {number} initialValue Initial value of the function at x = 0
 * @param {number} growthFactor Factor at which the function growth/decays
 * @param {number} xValue Point at which we want to calculate
 * @returns {number} Amount at x
 */
function exponentialGrowth(initialValue, growthFactor, xValue) {

    if (growthFactor == 1) {
        return initialValue;
    }

    if (xValue == 0) {
        return initialValue;
    }

    if (initialValue == 0 || growthFactor == 0) {
        return 0;
    }

    let growth = exponentiation(growthFactor, xValue);
    let result = 0;
    if (isNaN(growth)) {
        return NaN;
    }

    result = initialValue * growth;

    return parseFloat(result.toFixed(5));
}

module.exports = exponentialGrowth
