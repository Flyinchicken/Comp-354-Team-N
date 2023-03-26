import {squareRoot} from "./squareRoot.js";

function std(nums){
    let sum = 0, count = 0, mean = 0, std = 0, diff = 0;
    
    nums.forEach(element => {
        sum += element;
        count++;
    });

    mean = sum / count;
    sum = 0;

    nums.forEach(element => {
        diff = element - mean;
        sum += diff * diff;
    });
    
    std = squareRoot(sum / (nums.length - 1));
    return std;
}
export {std};



