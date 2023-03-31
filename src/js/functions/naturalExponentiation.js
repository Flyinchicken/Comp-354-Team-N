function naturalExponentiation(exponent) {
    if(exponent === 1) return Math.E;

    if(exponent === 0) return 1;

    if(exponent === -1) return 1/Math.E;

    let result = 1;
    let term = 1;

    for (let n = 1; n <= 2000; n++) {
        term *= exponent/n;
        result += term;
    }

    return result
}

module.exports = naturalExponentiation;