const hyperbolicSine = require("./hyperbolicSine");

describe('testing hyperbolic sine with different parameters', () => {
  test('Hyperbolic sine of rashed is NaN', () => {
    expect(hyperbolicSine('rashed')).toBe(NaN);
  });

  test('Hyperbolic sine of 1 is 1.175201194', () => {
    expect(hyperbolicSine(1)).toBe(1.175201194);
  });

  test('Hyperbolic sine of 0 is 0', () => {
    expect(hyperbolicSine(0)).toBe(0);
  });

  test('Hyperbolic sine of -1 is -1.175201194', () => {
    expect(hyperbolicSine(-1)).toBe(-1.175201194);
  });

  test('Hyperbolic sine of 20.1 is 268095232.2', () => {
    expect(hyperbolicSine(20.1)).toBe(268095232.2);
  });
});