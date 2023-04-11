const math = require("./funcWrapJest.js");

/**
 * Tests the logarithm function
 */
test("logarithm of 1000 base 10 is 3", () => {
  expect(math.log(1000, 10)).toBeCloseTo(3);
});

test("logarithm of 8 base 2 is 3", () => {
  expect(math.log(8, 2)).toBeCloseTo(3, 5);
});

test("logarithm of 1 base 10 is 0", () => {
  expect(math.log(1, 10)).toBe(0);
});

test("logarithm of 1 base e is 0", () => {
  expect(math.log(1, Math.E)).toBe(0);
});

test("logarithm of 10 base e is 2.302", () => {
  expect(math.log(10, Math.E)).toBeCloseTo(2.302);
});

test("logarithm of 0 base 10 is NaN", () => {
  expect(math.log(0, 10)).toBe(NaN);
});

test("logarithm of 10 base 1 is NaN", () => {
  expect(math.log(10, 1)).toBe(NaN);
});

test("logarithm of -10 base 2 is NaN", () => {
  expect(math.log(-10, 2)).toBe(NaN);
});

test("logarithm of 200 base 20 is 1.768", () => {
  expect(math.log(200, 20)).toBeCloseTo(1.768);
});
