const math = require("./funcWrapJest.js");

/**
 * Tests the hyperbolic sine function
 */
test("Hyperbolic sine of rashed is NaN", () => {
  expect(math.hyperbolicSine("rashed")).toBe(NaN);
});

test("Hyperbolic sine of 1 is 1.175201194", () => {
  expect(math.hyperbolicSine(1)).toBeCloseTo(1.175201194);
});

test("Hyperbolic sine of 0 is 0", () => {
  expect(math.hyperbolicSine(0)).toBe(0);
});

test("Hyperbolic sine of -1 is -1.175201194", () => {
  expect(math.hyperbolicSine(-1)).toBeCloseTo(-1.175201194);
});

test("Hyperbolic sine of 20.1 is 268095232.2", () => {
  expect(math.hyperbolicSine(20.1)).toBeCloseTo(268095232.21469);
});
