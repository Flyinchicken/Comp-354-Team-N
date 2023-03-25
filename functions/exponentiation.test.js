const exponentiation = require("./exponentiation.js");

/**
 * Tests the exponentiation function
 */
describe('Exponentiation Function', () => {
    test('Any number raised to 0 is 1', () => {
        expect(parseFloat(exponentiation(5, 0))).toBe(1);
    });

    test('0 raised to a negative number is not defined', () => {
        expect(parseFloat(exponentiation(0, -1))).toBe(NaN);
    });

    test('2 raised to 3 is 8', () => {
        expect(parseFloat(exponentiation(2, 3))).toBe(8);
    });

    test('0.5 raised to 4 is 0.0625', () => {
        expect(parseFloat(exponentiation(0.5, 4))).toBe(0.0625);
    });

    test('-0.5 raised to 4 is 0.0625', () => {
        expect(parseFloat(exponentiation(-0.5, 4))).toBe(0.0625);
    });

    test('-0.5 raised to 3 is -0.125', () => {
        expect(parseFloat(exponentiation(-0.5, 3))).toBe(-0.125);
    });
});
