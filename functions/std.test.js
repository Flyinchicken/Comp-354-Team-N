const std = require('./std');

describe('Standard deviation', () => {
  test('Standard deviation of "1,2,3,4,5,6"', () => {
    expect(std("1,2,3,4,5,6")).toBe(NaN);
  });

  test('Standard deviation of []', () => {
    expect(std([])).toBe(NaN);
  });

  test('Standard deviation of [1]', () => {
    expect(std([1])).toBe(NaN);
  });

  test('Standard deviation of [1,2]', () => {
    expect(std([1,2])).toBe(0.7071067812);
  });

  test('Standard deviation of [10, 12, 23, 23, 16, 23, 21, 16]', () => {
    expect(std([10, 12, 23, 23, 16, 23, 21, 16])).toBe(5.2372293657);
  });
});
