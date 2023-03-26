const squareRoot = require("./squareRoot")

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

    return parseFloat(std.toFixed(10));
}
module.exports = std



