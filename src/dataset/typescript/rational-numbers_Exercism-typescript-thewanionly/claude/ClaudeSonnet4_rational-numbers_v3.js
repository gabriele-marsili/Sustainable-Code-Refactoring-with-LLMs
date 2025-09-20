"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rational = void 0;
class Rational {
    constructor(numerator, denominator) {
        if (denominator === 0) {
            throw new Error("Denominator cannot be zero");
        }
        const gcd = this.gcd(Math.abs(numerator), Math.abs(denominator));
        this.numerator = numerator / gcd;
        this.denominator = denominator / gcd;
        if (this.denominator < 0) {
            this.numerator *= -1;
            this.denominator *= -1;
        }
    }
    add(rationalNumber) {
        const newNumerator = this.numerator * rationalNumber.denominator + this.denominator * rationalNumber.numerator;
        const newDenominator = this.denominator * rationalNumber.denominator;
        return new Rational(newNumerator, newDenominator);
    }
    sub(rationalNumber) {
        const newNumerator = this.numerator * rationalNumber.denominator - this.denominator * rationalNumber.numerator;
        const newDenominator = this.denominator * rationalNumber.denominator;
        return new Rational(newNumerator, newDenominator);
    }
    mul(rationalNumber) {
        const newNumerator = this.numerator * rationalNumber.numerator;
        const newDenominator = this.denominator * rationalNumber.denominator;
        return new Rational(newNumerator, newDenominator);
    }
    div(rationalNumber) {
        if (rationalNumber.numerator === 0) {
            throw new Error("Cannot divide by zero");
        }
        const newNumerator = this.numerator * rationalNumber.denominator;
        const newDenominator = this.denominator * rationalNumber.numerator;
        return new Rational(newNumerator, newDenominator);
    }
    abs() {
        return new Rational(Math.abs(this.numerator), this.denominator);
    }
    exprational(exponent) {
        if (exponent === 0) {
            return new Rational(1, 1);
        }
        if (exponent > 0) {
            return new Rational(Math.pow(this.numerator, exponent), Math.pow(this.denominator, exponent));
        }
        else {
            const absExponent = -exponent;
            return new Rational(Math.pow(this.denominator, absExponent), Math.pow(this.numerator, absExponent));
        }
    }
    expreal(realNumber) {
        return Math.pow(realNumber, this.numerator / this.denominator);
    }
    reduce() {
        return this;
    }
    gcd(a, b) {
        a = Math.abs(a);
        b = Math.abs(b);
        while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
}
exports.Rational = Rational;
