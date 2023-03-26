/* 
Analysis: Newton's Method for root finding
Consider calculating the square root of a number N as finding the positive root of the equation: x^2 - N = 0;

Formula：
    Xi: ith guess of the square root
    X_(i+1) = Xi - f(Xi)/(f'(Xi))

Derivative of f(x) = X^2 - N:
    f'(Xi) = 2 * Xi

Equation: X_(i+1) = Xi - (Xi ^ 2 - N) / (2 * Xi) 
                  = (Xi + N / Xi) / 2

1. Take a initial guess for the square root
2. Add the intial guess to N divided by the intiial guess, then divide by 2. The result becomes a new guess.
3. Repeat step 2 until finding the smallest guess whose square >= N

Pseudocode:
    squareRoot(num):
        sqrt = num;
        precision = 10^(-10)
        diff = sqrt * sqrt - num;

        while diff > precision:
            sqrt = (sqrt + num / sqrt)/ 2
            diff = sqrt * sqrt - num

        return sqrt

    Time Complexity: O(logN)
    Space Complexity: O(1)

Source: https://math.mit.edu/~stevenj/18.335/newton-sqrt.pdf
*/
function squareRoot(num){
    if(num < 0) return NaN;

    let sqrt = num, precision = 0.0000000001, diff = 1, square = 0, prev = 0;

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

    return parseFloat(sqrt.toFixed(10));
}
module.exports = squareRoot