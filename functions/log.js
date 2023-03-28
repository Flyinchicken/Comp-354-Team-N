function log(x, base) {
  // check for invalid input
  if (x <= 0 || base <= 0 || base === 1) {
    return NaN;
  }

  let result = 0;
  while (x >= base) {
    x /= base;
    result++;
  }

  let fractional = 0;
  let multiplier = 1.15;
  const MAX_ITERATIONS = 100;
  let i = 0;
  while (x !== 1 && i < MAX_ITERATIONS) {
    if (x < 1) {
      x *= base;
      fractional -= multiplier;
    } else {
      x /= base;
      fractional += multiplier;
    }
    multiplier /= 2;
    i++;
  }

  return result + fractional;
}

module.exports = log;
