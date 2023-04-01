const PRECISION = 5;
function arccos(ratio){
    if (ratio === -1){
        return PI.toFixed(PRECISION);
    }

    if (ratio === 1){
        return 0.0.toFixed(PRECISION);
    }
    ratio = parseFloat(ratio);
    if((ratio - 1.000000000000000) > 0 || (ratio + 1.000000000000000) < 0){
        return NaN;
    }

    return (PI/2 - arcsin(ratio)).toFixed(PRECISION);
}

function arcsin(ratio){

    if(ratio === 0){
        return 0;
    }

    x = (ratio < 0)? (-1.0 * ratio) : ratio;
    abs_ratio = (ratio < 0)? (-1.0 * ratio) : ratio;
    sign = (ratio < 0)? (-1.0) : (1.0);

    result = 1.5707963050;
    a1 = -0.2145988016;
    a2 = 0.0889789874;
    a3 = -0.0501743046;
    a4 = 0.0308918810;
    a5 = -0.0170881256;
    a6 = 0.0066700901;
    a7 = -0.0012624911;
    result += a1 * x;
    x *= x;
    result += a2 * x;
    x *= x;
    result += a3 * x;
    x *= x;
    result += a4 * x;
    x *= x;
    result += a5 * x;
    x *= x;
    result += a6 * x;
    x *= x;
    result += a7 * x;
    result *= squareRoot(1 - abs_ratio);
    result = PI/2 - result;

    return (sign * result);
}

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
        
        return naturalExponentiation(exponent).toFixed(PRECISION);
    }

    if (exponent < 0) {
        exponent = - exponent;
        base = 1 / base;
    }

    let result = base;
    for (let i = 1; i < exponent; i++) {
        result *= base;
    }

    return result.toFixed(PRECISION);
}


function exponentialGrowth(initialValue, growthFactor, xValue, decimalPlaces){
    if(growthFactor == 1)
        return initialValue;

    if(xValue == 0)
        return initialValue;

    if(initialValue == 0)
        return 0;
    
    let growth = exponentiation(growthFactor, xValue); 
    let result = 0;
    if(isNaN(growth))
        return NaN;

    result = initialValue * growth;
    return parseFloat(result.toFixed(decimalPlaces));
}

function hyperbolicSine(x) { // check for invalid input
    if (typeof x != 'number') 
        return NaN;

    let result = (naturalExponentiation(x) - naturalExponentiation(- x)) / 2;

    return parseFloat(result.toPrecision(10));
}


function log(x, base) { // check for invalid input
    if (x <= 0 || base <= 0 || base === 1) {
        return NaN;
    }

    return (naturalLog(x) / naturalLog(base)).toFixed(PRECISION);
}

function naturalLog(number) { // log of non-positive number is undefined
    if (number <= 0) 
        return NaN;

    if (number === 1) 
        return 0;

    let guess = 10; // initial guess
    let error = 1e-10; // desired precision
    let prevGuess;
    // store previous guess

    // keep iterating until desired precision is reached
    do {
        prevGuess = guess;
        guess = guess - 1 + number * naturalExponentiation(- guess);
    } while (Math.abs(guess - prevGuess) > error);

    return guess;
}

function naturalExponentiation(exponent) {
    if (exponent === 1) 
        return Math.E;
    
    if (exponent === 0) 
        return 1;
    
    if (exponent === -1) 
        return 1 / Math.E;
    
    let result = 1;
    let term = 1;

    for (let n = 1; n <= 2000; n++) {
        term *= exponent / n;
        result += term;
    }

    return result
}

function mad(input) {
    const numbers = input.split(',').map(Number); // string of numbers to array of numbers
    const sum = numbers.reduce((partialSum, num) => partialSum + num, 0);
    const mean = sum / numbers.length;
    const absoluteDeviations = numbers.map((num) => abs(num - mean));
    const mad = absoluteDeviations.reduce((partialSum, a) => partialSum + a, 0) / numbers.length;

    return mad.toFixed(PRECISION);
}

function abs(num) {
    if (num < 0) {
        return -1 * num;
    } 
    return num;
}

function squareRoot(num){
    if(num < 0){
        return NaN;
    }else if(num == 0 || num == 1){
        return num;
    }

    let sqrt = num, precision = Number.MIN_VALUE, diff = 1, square = 0, prev = 0;

    while(diff > precision){
        prev = sqrt;
        sqrt = (sqrt + num / sqrt) / 2;
        diff = prev - sqrt;

        if(diff < 0){ //handle the cases of decimal inputs
            diff *= -1;
        }

        if(diff <= precision){ //avoid unnecessary narrowing
            break;
        }

        square = sqrt * sqrt;
        diff = square - num;
    }

    return sqrt;
}

function std(nums){
    if(! Array.isArray(nums) || nums.length < 2){ //Ignore invalid inputs
        return NaN;
    }

    let sum = 0, count = 0, mean = 0, std = 0, diff = 0, variance = 0;
    
    //find the mean of the inputs
    nums.forEach(element => {
        sum += element;
        count++;
    });

    mean = sum / count;
    sum = 0;

    //find the sum of the square of the difference between each element and the mean
    nums.forEach(element => {
        diff = element - mean;
        sum += diff * diff;
    });
    
    variance = sum / (nums.length - 1);
    std = squareRoot(variance);

    return std;
}

export { squareRoot, arccos, arcsin, exponentialGrowth, exponentiation, hyperbolicSine, log, mad, std };
