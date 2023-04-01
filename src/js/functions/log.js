const naturalLog = require("./naturalLog.js");


function log(x, base) {
  // check for invalid input
  if (x <= 0 || base <= 0 || base === 1) {
    return NaN;
  }
  
  return naturalLog(x)/naturalLog(base);
}

module.exports = log;
