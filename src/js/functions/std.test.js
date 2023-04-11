const math = require("./funcWrapJest.js");

/**
 * Tests the standard deviation function
 */
test('Standard deviation of "1,2,3,4,5,6"', () => {
  expect(math.std("1,2,3,4,5,6")).toBe(NaN);
});

test("Standard deviation of []", () => {
  expect(math.std([])).toBe(NaN);
});

test("Standard deviation of [1]", () => {
  expect(math.std([1])).toBe(NaN);
});

test("Standard deviation of [1,2]", () => {
  expect(math.std([1, 2])).toBeCloseTo(0.7071067812);
});

test("Standard deviation of [10, 12, 23, 23, 16, 23, 21, 16]", () => {
  expect(math.std([10, 12, 23, 23, 16, 23, 21, 16])).toBeCloseTo(5.2372293657);
});

test("Standard deviation of [10, 12, 23, 23, 16, 23, 21, 16]", () => {
  expect(math.std([10, 12, 23, 23, 16, 23, 21, 16])).toBeCloseTo(5.2372293657);
});
