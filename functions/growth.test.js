const exponentialGrowth = require("./growth");

describe('Testing Growth Function', () => {
  test('Non growing function', () => {
    expect(exponentialGrowth(5, 1, 12345,0)).toBe(5);
  });

  test('Testing X value at 0', () => {
    expect(exponentialGrowth(10, 1.15, 0,0)).toBe(10);
  });
  
  test('Testing initial value at 0', () => {
    expect(exponentialGrowth(0, 1.15, 12345,0)).toBe(0);
  });

  test('NaN or wrong input for the exponential part', () => {
    expect(exponentialGrowth(5, 0, -1,0)).toBe(NaN);
  });

  test('A standard growth', () => {
    expect(parseFloat(exponentialGrowth(5, 1.15, 4,8))).toBeCloseTo(8.74503125, 8);
  });

  test('A standard decay', () => {
    expect(parseFloat(exponentialGrowth(5, 0.5, 4,4))).toBeCloseTo(0.3125, 4);
  });

  test('Negative initial value (for a debt)', () => {
    expect(parseFloat(exponentialGrowth(-5, 1.15, 4,8))).toBeCloseTo(-8.74503125, 4);
  });

});