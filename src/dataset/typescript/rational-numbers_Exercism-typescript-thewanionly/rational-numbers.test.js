"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rational_numbers_1 = require("./rational-numbers");
describe('Addition', () => {
    it('Add two positive rational numbers', () => {
        const expected = new rational_numbers_1.Rational(7, 6);
        expect(new rational_numbers_1.Rational(1, 2).add(new rational_numbers_1.Rational(2, 3))).toEqual(expected);
    });
    it('Add a positive rational number and a negative rational number', () => {
        const expected = new rational_numbers_1.Rational(-1, 6);
        expect(new rational_numbers_1.Rational(1, 2).add(new rational_numbers_1.Rational(-2, 3))).toEqual(expected);
    });
    it('Add two negative rational numbers', () => {
        const expected = new rational_numbers_1.Rational(-7, 6);
        expect(new rational_numbers_1.Rational(-1, 2).add(new rational_numbers_1.Rational(-2, 3))).toEqual(expected);
    });
    it('Add a rational number to its additive inverse', () => {
        const expected = new rational_numbers_1.Rational(0, 1);
        expect(new rational_numbers_1.Rational(1, 2).add(new rational_numbers_1.Rational(-1, 2))).toEqual(expected);
    });
});
describe('Subtraction', () => {
    it('Subtract two positive rational numbers', () => {
        const expected = new rational_numbers_1.Rational(-1, 6);
        expect(new rational_numbers_1.Rational(1, 2).sub(new rational_numbers_1.Rational(2, 3))).toEqual(expected);
    });
    it('Subtract a positive rational number and a negative rational number', () => {
        const expected = new rational_numbers_1.Rational(7, 6);
        expect(new rational_numbers_1.Rational(1, 2).sub(new rational_numbers_1.Rational(-2, 3))).toEqual(expected);
    });
    it('Subtract two negative rational numbers', () => {
        const expected = new rational_numbers_1.Rational(1, 6);
        expect(new rational_numbers_1.Rational(-1, 2).sub(new rational_numbers_1.Rational(-2, 3))).toEqual(expected);
    });
    it('Subtract a rational number from itself', () => {
        const expected = new rational_numbers_1.Rational(0, 1);
        expect(new rational_numbers_1.Rational(1, 2).sub(new rational_numbers_1.Rational(1, 2))).toEqual(expected);
    });
});
describe('Multiplication', () => {
    it('Multiply two positive rational numbers', () => {
        const expected = new rational_numbers_1.Rational(1, 3);
        expect(new rational_numbers_1.Rational(1, 2).mul(new rational_numbers_1.Rational(2, 3))).toEqual(expected);
    });
    it('Multiply a negative rational number by a positive rational number', () => {
        const expected = new rational_numbers_1.Rational(-1, 3);
        expect(new rational_numbers_1.Rational(-1, 2).mul(new rational_numbers_1.Rational(2, 3))).toEqual(expected);
    });
    it('Multiply two negative rational numbers', () => {
        const expected = new rational_numbers_1.Rational(1, 3);
        expect(new rational_numbers_1.Rational(-1, 2).mul(new rational_numbers_1.Rational(-2, 3))).toEqual(expected);
    });
    it('Multiply a rational number by its reciprocal', () => {
        const expected = new rational_numbers_1.Rational(1, 1);
        expect(new rational_numbers_1.Rational(1, 2).mul(new rational_numbers_1.Rational(2, 1))).toEqual(expected);
    });
    it('Multiply a rational number by 1', () => {
        const expected = new rational_numbers_1.Rational(1, 2);
        expect(new rational_numbers_1.Rational(1, 2).mul(new rational_numbers_1.Rational(1, 1))).toEqual(expected);
    });
    it('Multiply a rational number by 0', () => {
        const expected = new rational_numbers_1.Rational(0, 1);
        expect(new rational_numbers_1.Rational(1, 2).mul(new rational_numbers_1.Rational(0, 1))).toEqual(expected);
    });
});
describe('Division', () => {
    it('Divide two positive rational numbers', () => {
        const expected = new rational_numbers_1.Rational(3, 4);
        expect(new rational_numbers_1.Rational(1, 2).div(new rational_numbers_1.Rational(2, 3))).toEqual(expected);
    });
    it('Divide a positive rational number by a negative rational number', () => {
        const expected = new rational_numbers_1.Rational(-3, 4);
        expect(new rational_numbers_1.Rational(1, 2).div(new rational_numbers_1.Rational(-2, 3))).toEqual(expected);
    });
    it('Divide two negative rational numbers', () => {
        const expected = new rational_numbers_1.Rational(3, 4);
        expect(new rational_numbers_1.Rational(-1, 2).div(new rational_numbers_1.Rational(-2, 3))).toEqual(expected);
    });
    it('Divide a rational number by 1', () => {
        const expected = new rational_numbers_1.Rational(1, 2);
        expect(new rational_numbers_1.Rational(1, 2).div(new rational_numbers_1.Rational(1, 1))).toEqual(expected);
    });
});
describe('Absolute value', () => {
    it('Absolute value of a positive rational number', () => {
        const expected = new rational_numbers_1.Rational(1, 2);
        expect(new rational_numbers_1.Rational(1, 2).abs()).toEqual(expected);
    });
    it('Absolute value of a negative rational number', () => {
        const expected = new rational_numbers_1.Rational(1, 2);
        expect(new rational_numbers_1.Rational(-1, 2).abs()).toEqual(expected);
    });
    it('Absolute value of zero', () => {
        const expected = new rational_numbers_1.Rational(0, 1);
        expect(new rational_numbers_1.Rational(0, 1).abs()).toEqual(expected);
    });
});
describe('Exponentiation of a rational number', () => {
    it('Raise a positive rational number to a positive integer power', () => {
        const expected = new rational_numbers_1.Rational(1, 8);
        expect(new rational_numbers_1.Rational(1, 2).exprational(3)).toEqual(expected);
    });
    it('Raise a negative rational number to a positive integer power', () => {
        const expected = new rational_numbers_1.Rational(-1, 8);
        expect(new rational_numbers_1.Rational(-1, 2).exprational(3)).toEqual(expected);
    });
    it('Raise zero to an integer power', () => {
        const expected = new rational_numbers_1.Rational(0, 1);
        expect(new rational_numbers_1.Rational(0, 1).exprational(5)).toEqual(expected);
    });
    it('Raise one to an integer power', () => {
        const expected = new rational_numbers_1.Rational(1, 1);
        expect(new rational_numbers_1.Rational(1, 1).exprational(4)).toEqual(expected);
    });
    it('Raise a positive rational number to the power of zero', () => {
        const expected = new rational_numbers_1.Rational(1, 1);
        expect(new rational_numbers_1.Rational(1, 2).exprational(0)).toEqual(expected);
    });
    it('Raise a negative rational number to the power of zero', () => {
        const expected = new rational_numbers_1.Rational(1, 1);
        expect(new rational_numbers_1.Rational(-1, 2).exprational(0)).toEqual(expected);
    });
});
describe('Exponentiation of a real number to a rational number', () => {
    it('Raise a real number to a positive rational number', () => {
        const expected = 16.0;
        expect(new rational_numbers_1.Rational(4, 3).expreal(8)).toEqual(expected);
    });
    it('Raise a real number to a negative rational number', () => {
        const expected = 1.0 / 3.0;
        expect(new rational_numbers_1.Rational(-1, 2).expreal(9)).toBeCloseTo(expected, 15);
    });
    it('Raise a real number to a zero rational number', () => {
        const expected = 1.0;
        expect(new rational_numbers_1.Rational(0, 1).expreal(2)).toEqual(expected);
    });
});
describe('Reduction to lowest terms', () => {
    it('Reduce a positive rational number to lowest terms', () => {
        const expected = new rational_numbers_1.Rational(1, 2);
        expect(new rational_numbers_1.Rational(2, 4).reduce()).toEqual(expected);
    });
    it('Reduce a negative rational number to lowest terms', () => {
        const expected = new rational_numbers_1.Rational(-2, 3);
        expect(new rational_numbers_1.Rational(-4, 6).reduce()).toEqual(expected);
    });
    it('Reduce a rational number with a negative denominator to lowest terms', () => {
        const expected = new rational_numbers_1.Rational(-1, 3);
        expect(new rational_numbers_1.Rational(3, -9).reduce()).toEqual(expected);
    });
    it('Reduce zero to lowest terms', () => {
        const expected = new rational_numbers_1.Rational(0, 1);
        expect(new rational_numbers_1.Rational(0, 6).reduce()).toEqual(expected);
    });
    it('Reduce an integer to lowest terms', () => {
        const expected = new rational_numbers_1.Rational(-2, 1);
        expect(new rational_numbers_1.Rational(-14, 7).reduce()).toEqual(expected);
    });
    it('Reduce one to lowest terms', () => {
        const expected = new rational_numbers_1.Rational(1, 1);
        expect(new rational_numbers_1.Rational(13, 13).reduce()).toEqual(expected);
    });
});
