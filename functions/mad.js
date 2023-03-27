// Takes as argument string of real numbers
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

module.exports = mad;