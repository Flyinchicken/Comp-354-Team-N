const math = require("./funcWrapJest.js");

/**
 * Tests the square root function
 */
test("Square root of -1 is NaN", () => {
  expect(math.squareRoot(-1)).toBe(NaN);
});

test("Square root of 0 is 0", () => {
  expect(math.squareRoot(0)).toBe(0);
});

test("Square root of 0.04 is 0.2", () => {
  expect(math.squareRoot(0.04)).toBe(0.2);
});

test("Square root of 1 is 1", () => {
  expect(math.squareRoot(1)).toBe(1);
});

test("Square root of 4 is 2", () => {
  expect(math.squareRoot(4)).toBe(2);
});

test("Square root of 100 is 10", () => {
  expect(math.squareRoot(100)).toBe(10);
});

test("Square root of 2 is 1.4142135624", () => {
  expect(math.squareRoot(2)).toBeCloseTo(1.4142135624);
});
