const naturalExponentiation = require("./naturalExponentiation.js");

function hyperbolicSine(x) {
    // check for invalid input
    if(typeof x != 'number') return NaN;
    
    let result = (naturalExponentiation(x) - naturalExponentiation(-x))/2;
    
    return parseFloat(result.toPrecision(10));
}
module.exports = hyperbolicSine;