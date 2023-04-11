const math = require("./funcWrapJest.js");

/**
 * Tests the arc cosine function
 */
test("Arc cosine of 0 is always pi/2", () => {
  expect(math.arccos(0)).toBeCloseTo(Math.PI / 2);
});

test("Arc cosine of 1/2 is pi/3", () => {
  expect(math.arccos(1 / 2)).toBeCloseTo(Math.PI / 3);
});

test("Arc cosine of sqrt(2)/2 is pi/4", () => {
  expect(math.arccos(0.70710678118)).toBeCloseTo(Math.PI / 4);
});

test("Arc cosine of sqrt(3)/2 is pi/6", () => {
  expect(math.arccos(0.86602540378)).toBeCloseTo(Math.PI / 6);
});

test("Arc cosine of -1/2 is 2pi/3", () => {
  expect(math.arccos(-1 / 2)).toBeCloseTo((2 * Math.PI) / 3);
});

test("Arc cosine of -sqrt(2)/2 is 3pi/4", () => {
  expect(math.arccos(-0.70710678118)).toBeCloseTo((3 * Math.PI) / 4);
});

test("Arc cosine of -sqrt(3)/2 is 5pi/6", () => {
  expect(math.arccos(-0.86602540378)).toBeCloseTo((5 * Math.PI) / 6);
});

test("Arc cosine of -1 is pi", () => {
  expect(math.arccos(-1.0)).toBeCloseTo(Math.PI);
});

test("Arc cosine of 0.920330918458 is 0.401870647", () => {
  expect(math.arccos(0.920330918458)).toBeCloseTo((23.025492 / 180) * Math.PI);
});
