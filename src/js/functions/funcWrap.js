export class MathFunctions{

    /**
     * Calculate the angle in radian for a given input cosine value
     * @param {number} ratio a real number within [-1,1], representing the cosine value
     * @returns {number} an angle in radian that corresponds to the input cosine value
     */
    arccos(ratio){
        if (ratio === -1){
            return Math.PI;
        }

        if (ratio === 1){
            return 0.0;
        }

        ratio = parseFloat(ratio);
        if((ratio - 1.000000000000000) > 0 || (ratio + 1.000000000000000) < 0){
            return NaN;
        }

        return parseFloat((Math.PI/2 - this.arcsin(ratio)));
    }

    /**
     * Calculate the angle in radian for a given input sine value
     * @param {number} ratio ratio a real number within [-1,1], representing the sine value
     * @returns an angle in radian that corresponds to the input sine value
     */
    arcsin(ratio){
        if(ratio === 0){
            return 0;
        }

        let x = this.abs(ratio);
        let abs_ratio = x;
        let sign = (ratio < 0)? (-1.0) : (1.0);

        let result = 1.5707963050;
        let a1 = -0.2145988016;
        let a2 = 0.0889789874;
        let a3 = -0.0501743046;
        let a4 = 0.0308918810;
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
        result *= this.squareRoot(1 - abs_ratio);
        result = Math.PI/2 - result;

        return (sign * result);
    }

    /**
     * Exponentiation function that raises the base to the given exponent.
     * @param {number} base The number to be raised
     * @param {number} exponent The power to which the base should be raised
     * @returns {string} result of the base raised to the exponent
     */
    exponentiation(base, exponent) {
        
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
                exponent = exponent * this.naturalLog(base);
            
            return this.naturalExponentiation(exponent);
        }

        if (exponent < 0) {
            exponent = - exponent;
            base = 1 / base;
        }

        let result = base;
        for (let i = 1; i < exponent; i++) {
            result *= base;
        }
        
        return parseFloat(result);
    }

    /**
     * Calculate the exponential growth at point x given growth factor and initial value
     * @param {number} initialValue Initial value of the function at x = 0
     * @param {number} growthFactor Factor at which the function growth/decays
     * @param {number} xValue Point at which we want to calculate
     * @returns {number} Amount at x
     */
    exponentialGrowth(initialValue, growthFactor, xValue) {

        if (growthFactor == 1) {
            return initialValue;
        }

        if (xValue == 0) {
            return initialValue;
        }

        if (initialValue == 0 || growthFactor == 0) {
            return 0;
        }

        let growth = this.exponentiation(growthFactor, xValue);
        let result = 0;
        if (isNaN(growth)) {
            return NaN;
        }

        result = initialValue * growth;

        return parseFloat(result);
    }

    /**
     * Calculate the hyperbolic sin at a given point
     * @param {number} x Point at which we want to calculate
     * @returns {number} Value of the hyperbolic sin at x
     */
    hyperbolicSine(x) {
        let result = (this.naturalExponentiation(x) - this.naturalExponentiation(- x)) / 2;
        return parseFloat(result);
    }

    /**
     * Calculate the logarithm of x with a specific base
     * @param {number} x Point at which we want to calculate
     * @param {number} base Base of the logarithm
     * @returns {number} Value of the logarithm
     */
    log(x, base) {
        // check for invalid input
        if (x <= 0 || base <= 0 || base === 1) {
            return NaN;
        }
        
        return parseFloat((this.naturalLog(x)/this.naturalLog(base)));
    }

    /**
     * Calculate the natural logarithm (e) of x
     * @param {number} number Point at which we want to calculate
     * @returns {number} Value of the natural log
     */
    naturalLog(number) {
        // log of non-positive number is undefined
    if (number <= 0) return NaN;

    if (number === 1) return 0;

    let guess = 10; // initial guess
    let error = 1e-10; // desired precision
    let prevGuess; // store previous guess

    // keep iterating until desired precision is reached
    do {
        prevGuess = guess;
        guess = guess - 1 + number*this.naturalExponentiation(-guess);
    } while (this.abs(guess - prevGuess) > error);

    return guess;
    }

    /**
     * Calculate the natural exponent of x with base e
     * @param {number} exponent Point at which we want to calculate
     * @returns {number} Value of the e^exponent
     */
    naturalExponentiation(exponent) {
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

    /**
     * Calculate the MAD (Median Absolute Deviation) of a series of numbers
     * @param {string} input String of inputs separated by commas
     * @returns {number} The MAD
     */
    mad(input) {
        const numbers = input.split(',').map(Number); // string of numbers to array of numbers
        const sum = numbers.reduce((partialSum, num) => partialSum + num, 0);
        const mean = sum / numbers.length;
        const absoluteDeviations = numbers.map((num) => this.abs(num - mean));
        const mad = absoluteDeviations.reduce((partialSum, a) => partialSum + a, 0) / numbers.length;

        return parseFloat(mad);
    }

    /**
     * Calculate the absolute value of a number
     * @param {number} num Number that we want to absolute value of
     * @returns {number} Positive number
     */
    abs(num) {
        return (num < 0) ? -num : num;
    }

    /**
    @param {number} num a positive target number of square root
    @returns {number} the positive square root of the input
    */
    squareRoot(num){
        if(num < 0){
            return NaN;
        }else if(num == 0 || num == 1){
            return num;
        }

        let sqrt = num, precisionX = Number.MIN_VALUE, diff = 1, square = 0, prev = 0;

        while(diff > precisionX){
            prev = sqrt;
            sqrt = (sqrt + num / sqrt) / 2;
            diff = prev - sqrt;

            if(diff < 0){ //handle the cases of decimal inputs
                diff *= -1;
            }

            if(diff <= precisionX){ //avoid unnecessary narrowing
                break;
            }

            square = sqrt * sqrt;
            diff = square - num;
        }

        return parseFloat(sqrt);
    }

    /**
     * @param {number[]} nums an array of integers
     * @returns {number} the standard deviation of the array of integers
     */
    std(nums){
        if(! Array.isArray(nums) || nums.length < 2){ //Ignore invalid inputs
            return NaN;
        }

        let floatArray = [];

        nums.forEach(element => {
            floatArray.push(parseFloat(element));
        });

        let sum = 0, count = 0, mean = 0, std = 0, diff = 0, variance = 0;
        
        //find the mean of the inputs
        floatArray.forEach(element => {
            sum += element;
            count++;
        });

        mean = sum / count;
        sum = 0;

        //find the sum of the square of the difference between each element and the mean
        floatArray.forEach(element => {
            diff = element - mean;
            sum += diff * diff;
        });
        
        variance = sum / (floatArray.length - 1);
        std = this.squareRoot(variance);

        return parseFloat(std);
    }
}