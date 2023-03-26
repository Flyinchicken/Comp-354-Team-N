const log = require('./log');

describe('log', () => {
  test('logarithm of 1000 base 10 is 3', () => {
    expect(log(1000, 10)).toBe(3);
  });

  test('logarithm of 8 base 2 is 3', () => {
    expect(log(8, 2)).toBeCloseTo(3, 5);
  });

  test('logarithm of 1 base 10 is 0', () => {
    expect(log(1, 10)).toBe(0);
  });

  test('logarithm of 0 base 10 is NaN', () => {
    expect(log(0, 10)).toBe(NaN);
  });

  test('logarithm of 10 base 1 is NaN', () => {
    expect(log(10, 1)).toBe(NaN);
  });

  test('logarithm of -10 base 2 is NaN', () => {
    expect(log(-10, 2)).toBe(NaN);
  });
});
