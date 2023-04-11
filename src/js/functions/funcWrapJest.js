function arccos(ratio) {
  if (ratio === -1) {
    return Math.PI;
  }

  if (ratio === 1) {
    return 0.0;
  }

  ratio = parseFloat(ratio);
  if (ratio - 1.0 > 0 || ratio + 1.0 < 0) {
    return NaN;
  }

  return parseFloat(Math.PI / 2 - arcsin(ratio));
}

function arcsin(ratio) {
  if (ratio === 0) {
    return 0;
  }

  let x = abs(ratio);
  let abs_ratio = x;
  let sign = ratio < 0 ? -1.0 : 1.0;

  let result = 1.570796305;
  let a1 = -0.2145988016;
  let a2 = 0.0889789874;
  let a3 = -0.0501743046;
  let a4 = 0.030891881;
  let a5 = -0.0170881256;
  let a6 = 0.0066700901;
  let a7 = -0.0012624911;
  result += a1 * x;
  x *= abs_ratio;
  result += a2 * x;
  x *= abs_ratio;
  result += a3 * x;
  x *= abs_ratio;
  result += a4 * x;
  x *= abs_ratio;
  result += a5 * x;
  x *= abs_ratio;
  result += a6 * x;
  x *= abs_ratio;
  result += a7 * x;
  result *= squareRoot(1 - abs_ratio);
  result = Math.PI / 2 - result;

  return sign * result;
}

function exponentiation(base, exponent) {
  base = parseFloat(base);
  exponent = parseFloat(exponent);
  if (base === 0 && exponent <= 0){
    return NaN;
  }

  if (base === 0){
    return 0;
  }

  if (base === 1 || exponent === 0){
    return 1;
  }

  if (exponent === 1){
    return base;
  }

  if (!Number.isInteger(exponent)) {
    if (base === 1 / Math.E) exponent = -exponent;
    else if (base !== Math.E) exponent = exponent * naturalLog(base);

    return naturalExponentiation(exponent);
  }

  if (exponent < 0) {
    exponent = -exponent;
    base = 1 / base;
  }

  let result = base;
  for (let i = 1; i < exponent; i++) {
    result *= base;
  }

  return parseFloat(result);
}

function exponentialGrowth(initialValue, growthFactor, xValue) {
  if (growthFactor == 0 && xValue < 0){
    return NaN;
  }

  if (growthFactor == 1){
    return initialValue;
  } 

  if (xValue == 0){
    return initialValue;
  }

  if (initialValue == 0 || growthFactor == 0){
    return 0;
  }

  let growth = exponentiation(growthFactor, xValue);

  if (isNaN(growth)){
    return NaN;
  }

  return initialValue * growth;
}

function hyperbolicSine(x) {
  let result = (naturalExponentiation(x) - naturalExponentiation(-x)) / 2;
  return parseFloat(result);
}

function log(x, base) {
  if (x <= 0 || base <= 0 || base === 1) {
    return NaN;
  }

  return parseFloat(naturalLog(x) / naturalLog(base));
}

function naturalLog(number) {
  if (number <= 0){
    return NaN;
  }

  if (number === 1){
    return 0;
  }

  let guess = 10;
  let error = 1e-10;
  let prevGuess;

  do {
    prevGuess = guess;
    guess = guess - 1 + number * naturalExponentiation(-guess);
  } while (abs(guess - prevGuess) > error);

  return guess;
}

function naturalExponentiation(exponent) {
  if (exponent === 1){
    return Math.E;
  }

  if (exponent === 0){
    return Math.E;
  }

  if (exponent === -1){
    return 1 / Math.E;
  }

  let result = 1;
  let term = 1;

  for (let n = 1; n <= 2000; n++) {
    term *= exponent / n;
    result += term;
  }

  return result;
}

function mad(input) {
  const numbers = input.split(",").map(Number);
  const sum = numbers.reduce((partialSum, num) => partialSum + num, 0);
  const mean = sum / numbers.length;
  const absoluteDeviations = numbers.map((num) => abs(num - mean));
  const mad =
    absoluteDeviations.reduce((partialSum, a) => partialSum + a, 0) /
    numbers.length;

  return parseFloat(mad);
}

function abs(num) {
  return num < 0 ? -num : num;
}

function squareRoot(num) {
  if (num < 0){
    return NaN;
  }

  if (num == 0 || num == 1){
    return num;
  }

  let sqrt = num,
    precisionX = Number.MIN_VALUE,
    diff = 1,
    square = 0,
    prev = 0;

  while (diff > precisionX) {
    prev = sqrt;
    sqrt = (sqrt + num / sqrt) / 2;
    diff = prev - sqrt;

    if (diff < 0) {
      diff *= -1;
    }

    if (diff <= precisionX) {
      break;
    }

    square = sqrt * sqrt;
    diff = square - num;
  }

  return parseFloat(sqrt);
}

function std(nums) {
  if (!Array.isArray(nums) || nums.length < 2) {
    return NaN;
  }

  let floatArray = [];

  nums.forEach((element) => {
    floatArray.push(parseFloat(element));
  });

  let sum = 0,
    count = 0,
    mean = 0,
    std = 0,
    diff = 0,
    variance = 0;

  floatArray.forEach((element) => {
    sum += element;
    count++;
  });

  mean = sum / count;
  sum = 0;

  floatArray.forEach((element) => {
    diff = element - mean;
    sum += diff * diff;
  });

  variance = sum / (floatArray.length - 1);
  std = squareRoot(variance);

  return parseFloat(std);
}

module.exports = {
  abs,
  arccos,
  arcsin,
  exponentiation,
  exponentialGrowth,
  hyperbolicSine,
  log,
  naturalLog,
  mad,
  naturalExponentiation,
  squareRoot,
  std,
};
