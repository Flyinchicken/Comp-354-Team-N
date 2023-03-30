function hyperbolicSine(x) {
    // check for invalid input
    if(typeof x != 'number') return NaN;
    
    let result = (Math.exp(x) - Math.exp(-x))/2;
    
    return parseFloat(result.toPrecision(10));
}
module.exports = hyperbolicSine;