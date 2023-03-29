/**
 Analysis:
 1. Find the mean of the inputs
 2. find the sum of the square of the difference between each element and the mean
 3. find the variance and take the square root to get the standard deviation
 
 Time Complexity: O(N)
 Space Complexity: O(1)
*/
const squareRoot = require("./squareRoot")
/**
 * @param {number[]} nums an array of integers
 * @returns {number} the standard deviation of the array of integers
 */
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
module.exports = std



