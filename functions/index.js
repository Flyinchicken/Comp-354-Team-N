const readline = require('readline');
const log = require('./log');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter a number: ', (x) => {
  rl.question('Enter the base of the logarithm: ', (base) => {
    const result = log(parseFloat(x), parseFloat(base));
    console.log(`The logarithm of ${x} base ${base} is ${result}`);
    rl.close();
  });
});
