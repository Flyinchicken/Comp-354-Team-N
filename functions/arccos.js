const squareRoot = require("./squareRoot");
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
 * 
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

    return (PI/2 - arcsin(ratio)).toFixed(PRECISION);
}


/*
Arc sine funciton absolute error less than 2 x 10^-8
*/
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
module.exports = arccos