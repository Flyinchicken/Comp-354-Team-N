const squareRoot = require("./squareRoot");
const abs = require("./abs");
/*
Analysis of arc cosine function

Definition: the arc cosine function takes the cosine value, a real number, as an input and 
returns the angle in radian corresponding to the cosine value. In geometry, the value of a
cosine function represents the ratio bewteen the x-component of a point on the unit circle
and the radius of the unit circle. Hence, in this implementation, the input parameter is 
called "ratio". 

Since the value of a cosine function in the real number field is always within [-1,1], the
function returns NaN for any invalid input ratio.

For any valid input ratio, the value of the arccos function can be calculated from the value
of the arcsin function as the sum of arccos and arcsin is always pi/2. Detailed proof can be
found in the manuscript.
*/

const PI = 3.1415926358979;
const PRECISION = 5;
/**
 * Calculate the angle in radian for a given input cosine value
 * @param {number} ratio a real number within [-1,1], representing the cosine value
 * @returns {number} an angle in radian that corresponds to the input cosine value
 */
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

/*
Analysis of arc sine function

Definition: the arc sine function takes the sine value, a real number, as an input and 
returns the angle in radian corresponding to the sine value. In geometry, the value of a
sine function represents the ratio bewteen the y-component of a point on the unit circle
and the radius of the unit circle. Hence, in this implementation, the input parameter is 
called "ratio". 

Since the value of a sine function in the real number field is always within [-1,1], the
function returns NaN for any invalid input ratio. The arc sine function is used as a helper
function for the calculation of arc cosine, so invalid inputs are filtered already.

For any valid input ratio, the value of the arcsin function will fall within the range of
[-pi/2, pi/2]. Since arcsin is an odd function, f(-x) = -f(x), we just need to calculate the
positive input value and adjust the sign before returning the result.

Choice of algorithms:
1. Taylor series (expansion at 0 or 0.5): Always diverges when the input value gets close to
    1. In addition, the rate of convergence for taylor series is small. It is good for quick 
    and simple implementation but not for precise scientific computation.

2. Chebyshev approximation: good for minimizing the absolute max error within the interval but
    also diverges as the input gets closer to 1.

3. minimax polynomial approximation：method of choice for this implementation. It uses a 7 degree
polynomial to approximate the arcsin function. The coefficient is pre-determined in the book
"Approximations for Digital Computers" by Cecil Hastings Jr. in 1955.
Best result in
terms of precision. Before removing the singularity at x = 1, the absolute error is less than
2 x 10^-8, and with singularity removed, the precision is dropped to 4 decimal places.

Pseudo-code:
Input: ratio
x = abs(ratio)
sign = 1 if ratio > 0 else -1
phi(x) = a0 + a1x + a2x^2 + a3x^3 + a4x^4 + a5x^5 + a6x^6 + a7x^7  
arcsin(x) = sign * (PI/2 - sqrt(1 - x) * phi(x))

Complexity:
Time: O(logn) bounded by the squareRoot function
Space: O(1)

Reference: 
1. Cecil Hastings Jr. (1955) "Approximations for Digital Computers"
2. "Numerically Approximating the Arcsin Function"
https://wrfranklin.org/Research/Short_Notes/arcsin/top.shtml
*/

/**
 * Calculate the angle in radian for a given input sine value
 * @param {number} ratio ratio a real number within [-1,1], representing the sine value
 * @returns an angle in radian that corresponds to the input sine value
 */
function arcsin(ratio){

    if(ratio === 0){
        return 0;
    }

    x = abs(ratio);
    abs_ratio = x;
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
    result = PI/2 - result;

    return (sign * result);
}
module.exports = arccos