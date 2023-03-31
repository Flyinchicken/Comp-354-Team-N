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

    return (PI/2 - arcsin(ratio));
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
    if (exponent === 0) {
        if (base === 0) {
            return NaN;
        }
        return 1;
    }
    if (exponent < 0) {
        if (base === 0) {
            return NaN;
        }
        exponent = - exponent;
        base = 1 / base;
    }
    let result = base;
    for (let i = 1; i < exponent; i++) {
        result *= base;
    }
    result = formatToMinDecPlaces(result);
    return result;
}

function formatToMinDecPlaces(resultToFormat, minDecPlaces = 4, maxDecPlaces = 8) {
    let formattedResult = resultToFormat.toFixed(minDecPlaces);
    let resultToFormatString = resultToFormat.toString();
    if (resultToFormatString.length > formattedResult.length) {
        resultToFormat = resultToFormat.toFixed(maxDecPlaces);
        formattedResult = resultToFormat;
    }
    return formattedResult;
}

function exponentialGrowth(initialValue, growthFactor, xValue, decimalPlaces){

    if(growthFactor == 1){
        return initialValue;
    }

    if(xValue == 0){
        return initialValue;
    }

    if(initialValue == 0){
        return 0;
    }

    let growth = exponentiation(growthFactor, xValue); 
    let result = 0;
    if(isNaN(growth)){
        return NaN;
    }

    result = initialValue * growth;

    return parseFloat(result.toFixed(decimalPlaces));
}

function hyperbolicSine(x) {
    // check for invalid input
    if(typeof x != 'number') return NaN;
    
    let result = (Math.exp(x) - Math.exp(-x))/2;
    
    return parseFloat(result.toPrecision(10));
}

function log(x, base) {
    // check for invalid input
    if (x <= 0 || base <= 0 || base === 1) {
      return NaN;
    }
  
    let result = 0;
    while (x >= base) {
      x /= base;
      result++;
    }
  
    let fractional = 0;
    let multiplier = 1.15;
    const MAX_ITERATIONS = 100;
    let i = 0;
    while (x !== 1 && i < MAX_ITERATIONS) {
      if (x < 1) {
        x *= base;
        fractional -= multiplier;
      } else {
        x /= base;
        fractional += multiplier;
      }
      multiplier /= 2;
      i++;
    }
  
    return result + fractional;
  }

function mad(input) {
    const numbers = input.split(',').map(Number); // string of numbers to array of numbers
    const sum = numbers.reduce((partialSum, num) => partialSum + num, 0);
    const mean = sum / numbers.length;
    const absoluteDeviations = numbers.map((num) => abs(num - mean));
    const mad = absoluteDeviations.reduce((partialSum, a) => partialSum + a, 0) / numbers.length;

    return mad;
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