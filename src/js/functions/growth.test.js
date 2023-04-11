const math = require("./funcWrapJest.js");

/**
 * Tests the exponentional growth function
 */
test("Non growing function", () => {
  expect(math.exponentialGrowth(5, 1, 12345)).toBe(5);
});

test("Testing X value at 0", () => {
  expect(math.exponentialGrowth(10, 1.15, 0)).toBe(10);
});

test("Testing initial value at 0", () => {
  expect(math.exponentialGrowth(0, 1.15, 12345)).toBe(0);
});

test("NaN or wrong input for the exponential part", () => {
  expect(math.exponentialGrowth(5, 0, -1)).toBe(NaN);
});

test("A standard growth", () => {
  expect(math.exponentialGrowth(5, 1.15, 4)).toBeCloseTo(8.74503125);
});

test("A standard decay", () => {
  expect(math.exponentialGrowth(5, 0.5, 4)).toBeCloseTo(0.3125);
});

test("Negative initial value (for a debt)", () => {
  expect(math.exponentialGrowth(-5, 1.15, 4)).toBeCloseTo(-8.74503125);
});
