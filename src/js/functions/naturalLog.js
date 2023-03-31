const naturalExponentiation = require("./naturalExponentiation.js");

function naturalLog(number) {
    // log of non-positive number is undefined
  if (number <= 0) return NaN;

  if (number === 1) return 0;

  let guess = 10; // initial guess
  let error = 1e-10; // desired precision
  let prevGuess; // store previous guess

  // keep iterating until desired precision is reached
  do {
    prevGuess = guess;
    guess = guess - 1 + number*naturalExponentiation(-guess);
  } while (Math.abs(guess - prevGuess) > error);

  return guess;
}

module.exports = naturalLog;