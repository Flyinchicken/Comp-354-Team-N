const exponentiation = require("./exponentiation")

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

    return parseFloat(result.toFixed(PRECISION));
}

module.exports = exponentialGrowth