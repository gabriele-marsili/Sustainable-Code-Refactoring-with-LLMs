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
        const gcd = this.gcd(Math.abs(newNumerator), Math.abs(newDenominator));
        this.numerator = newNumerator / gcd;
        this.denominator = newDenominator / gcd;
        if (this.denominator < 0) {
            this.numerator *= -1;
            this.denominator *= -1;
        }
        return this;
    }
    sub(rationalNumber) {
        const newNumerator = this.numerator * rationalNumber.denominator - this.denominator * rationalNumber.numerator;
        const newDenominator = this.denominator * rationalNumber.denominator;
        const gcd = this.gcd(Math.abs(newNumerator), Math.abs(newDenominator));
        this.numerator = newNumerator / gcd;
        this.denominator = newDenominator / gcd;
        if (this.denominator < 0) {
            this.numerator *= -1;
            this.denominator *= -1;
        }
        return this;
    }
    mul(rationalNumber) {
        const newNumerator = this.numerator * rationalNumber.numerator;
        const newDenominator = this.denominator * rationalNumber.denominator;
        const gcd = this.gcd(Math.abs(newNumerator), Math.abs(newDenominator));
        this.numerator = newNumerator / gcd;
        this.denominator = newDenominator / gcd;
        if (this.denominator < 0) {
            this.numerator *= -1;
            this.denominator *= -1;
        }
        return this;
    }
    div(rationalNumber) {
        if (rationalNumber.numerator === 0) {
            throw new Error("Cannot divide by zero");
        }
        const newNumerator = this.numerator * rationalNumber.denominator;
        const newDenominator = this.denominator * rationalNumber.numerator;
        const gcd = this.gcd(Math.abs(newNumerator), Math.abs(newDenominator));
        this.numerator = newNumerator / gcd;
        this.denominator = newDenominator / gcd;
        if (this.denominator < 0) {
            this.numerator *= -1;
            this.denominator *= -1;
        }
        return this;
    }
    abs() {
        this.numerator = Math.abs(this.numerator);
        return this;
    }
    exprational(exponent) {
        if (exponent === 0) {
            this.numerator = 1;
            this.denominator = 1;
            return this;
        }
        if (exponent > 0) {
            this.numerator = Math.pow(this.numerator, exponent);
            this.denominator = Math.pow(this.denominator, exponent);
        }
        else {
            const absExponent = -exponent;
            const tempNumerator = this.numerator;
            this.numerator = Math.pow(this.denominator, absExponent);
            this.denominator = Math.pow(tempNumerator, absExponent);
        }
        return this.reduce();
    }
    expreal(realNumber) {
        return Math.pow(realNumber, this.numerator / this.denominator);
    }
    reduce() {
        if (this.numerator === 0) {
            this.denominator = 1;
            return this;
        }
        const gcd = this.gcd(Math.abs(this.numerator), Math.abs(this.denominator));
        this.numerator /= gcd;
        this.denominator /= gcd;
        if (this.denominator < 0) {
            this.numerator *= -1;
            this.denominator *= -1;
        }
        return this;
    }
    gcd(a, b) {
        while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
}
exports.Rational = Rational;
