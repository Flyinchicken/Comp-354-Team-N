const squareRoot = require("./squareRoot")

describe('Postive square root by default', () => {
  test('Square root of -1 is NaN', () => {
    expect(squareRoot(-1)).toBe(NaN);
  });

  test('Square root of 0 is 0', () => {
    expect(squareRoot(0)).toBe(0);
  });

  test('Square root of 0.4 is 0.2', () => {
    expect(squareRoot(0.04)).toBe(0.02);
  });

  test('Square root of 1 is 1', () => {
    expect(squareRoot(1)).toBe(1);
  });

  test('Square root of 4 is 2', () => {
    expect(squareRoot(4)).toBe(2);
  });

  test('Square root of 100 is 10', () => {
    expect(squareRoot(100)).toBe(10);
  });

  test('Square root of 2 is 1.4142135624', () => {
    expect(parseFloat(squareRoot(2).toFixed(10))).toBe(1.4142135624);
  });
});
