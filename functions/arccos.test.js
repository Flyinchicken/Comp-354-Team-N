const arccos = require("./arccos.js");
const PI = 3.1415926358979;

/**
 * Tests the arc cosine function
 */
describe('Arccos Function', () => {
    test('Arc cosine of 0 is always pi/2', () => {
        expect(arccos(0)).toBe((PI/2));
    });

    test('Arc cosine of 1/2 is pi/3', () => {
        expect(arccos(1/2)).toBeCloseTo((PI/3));
    });

    test('Arc cosine of sqrt(2)/2 is pi/4', () => {
        expect(arccos(0.70710678118)).toBeCloseTo((PI/4));
    });

    test('Arc cosine of sqrt(3)/2 is pi/6', () => {
        expect(arccos(0.86602540378)).toBeCloseTo((PI/6));
    });

    test('Arc cosine of -1/2 is 2pi/3', () => {
        expect(arccos(-1/2)).toBeCloseTo(2*PI/3);
    });

    test('Arc cosine of -sqrt(2)/2 is 3pi/4', () => {
        expect(arccos(-0.70710678118)).toBeCloseTo((3*PI/4));
    });

    test('Arc cosine of -sqrt(3)/2 is 5pi/6', () => {
        expect(arccos(-0.86602540378)).toBeCloseTo((5*PI/6));
    });

    test('Arc cosine of -1 is pi', () => {
        expect(arccos(-1.0)).toBe((PI).toFixed(5));
    });
});