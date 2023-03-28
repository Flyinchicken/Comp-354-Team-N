const exponentialGrowth = require("./growth");

describe('Testing Growth Function', () => {
  test('Non growing function', () => {
    expect(exponentialGrowth(5, 1, 12345,0)).toBe(5);
  });

});