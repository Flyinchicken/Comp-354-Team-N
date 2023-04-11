const math = require("./funcWrapJest.js");

/**
 * Tests the mean absolute deviation function
 */
test("Computes MAD of {50.12, 44.28, 6.79, 12.27, 32.61, 78, 56.82, 98.89, 42.91, 48} to 19.297", () => {
  expect(math.mad("50.12, 44.28, 6.79, 12.27, 32.61, 78, 56.82, 98.89, 42.91, 48")).toBeCloseTo(19.297, 6);
});

test("Computes MAD of {36, 35, 23, 31, 25, 10, 12} to 8.2040816326531", () => {
  expect(math.mad("36, 35, 23, 31, 25, 10, 12")).toBeCloseTo(8.2040816326531);
});

test("Computes MAD of {49.281, 35.883, 25.333, 29.644, 13.59} to 9.46864", () => {
  expect(math.mad("49.281, 35.883, 25.333, 29.644, 13.59")).toBeCloseTo(9.46864);
});

test("Computes MAD of {100, 46, 35, 57, 1, 66, 25, 2, 42, 65, 90, 76, 64} to 24.272189349112", () => {
  expect(math.mad("100, 46, 35, 57, 1, 66, 25, 2, 42, 65, 90, 76, 64")).toBeCloseTo(24.272189349112);
});

test("Computes MAD of {21.38, 19.29, 20.92, 29.28, 86.12, 66.91, 84.57, 67.8} to 26.81625", () => {
  expect(math.mad("21.38, 19.29, 20.92, 29.28, 86.12, 66.91, 84.57, 67.8")).toBeCloseTo(26.81625);
});
