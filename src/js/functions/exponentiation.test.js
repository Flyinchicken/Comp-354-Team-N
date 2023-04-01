const exponentiation = require("./exponentiation.js");

/**
 * Tests the exponentiation function
 */
describe('Exponentiation Function', () => {
    test('Any number raised to 0 is 1', () => {
        expect(exponentiation(5, 0)).toBe(1);
    });

    test('0 raised to a negative number is not defined', () => {
        expect(exponentiation(0, -1)).toBe(NaN);
    });

    test('2 raised to 3 is 8', () => {
        expect(exponentiation(2, 3)).toBe(8);
    });

    test('0.5 raised to 4 is 0.0625', () => {
        expect(exponentiation(0.5, 4)).toBe(0.0625);
    });

    test('-0.5 raised to 4 is 0.0625', () => {
        expect(exponentiation(-0.5, 4)).toBe(0.0625);
    });

    test('-0.5 raised to 3 is -0.125', () => {
        expect(exponentiation(-0.5, 3)).toBe(-0.125);
    });

    test('-0.5 raised to 3 is -0.125', () => {
        expect(exponentiation(-0.5, 3)).toBe(-0.125);
    });

    test('2 raised to 0.5 is close to 1.41421', () => {
        expect(exponentiation(2, 0.5)).toBeCloseTo(1.41421);
    });

    test('e raised to e is close to 15.154', () => {
        expect(exponentiation(Math.E, Math.E)).toBeCloseTo(15.154);
    });
});