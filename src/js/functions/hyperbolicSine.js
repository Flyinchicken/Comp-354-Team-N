const naturalExponentiation = require("./naturalExponentiation.js");

function hyperbolicSine(x) {    
    let result = (naturalExponentiation(x) - naturalExponentiation(-x))/2;
    
    return parseFloat(result.toPrecision(10));
}
module.exports = hyperbolicSine;
