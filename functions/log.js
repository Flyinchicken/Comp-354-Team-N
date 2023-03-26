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
  
  return parseFloat(result.toFixed(5));
}
module.exports = log
