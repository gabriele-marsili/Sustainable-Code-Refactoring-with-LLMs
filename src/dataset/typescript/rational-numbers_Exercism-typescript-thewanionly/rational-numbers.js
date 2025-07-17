"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rational = void 0;
class Rational {
    constructor(numerator, denominator) {
        this.numerator = numerator;
        this.denominator = denominator;
    }
    add(rationalNumber) {
        this.numerator =
            this.numerator * rationalNumber.denominator + this.denominator * rationalNumber.numerator;
        this.denominator = this.denominator * rationalNumber.denominator;
        return this.reduce();
    }
    sub(rationalNumber) {
        this.numerator =
            this.numerator * rationalNumber.denominator - this.denominator * rationalNumber.numerator;
        this.denominator = this.denominator * rationalNumber.denominator;
        return this.reduce();
    }
    mul(rationalNumber) {
        this.numerator = this.numerator * rationalNumber.numerator;
        this.denominator = this.denominator * rationalNumber.denominator;
        return this.reduce();
    }
    div(rationalNumber) {
        this.numerator = this.numerator * rationalNumber.denominator;
        this.denominator = this.denominator * rationalNumber.numerator;
        return this.reduce();
    }
    abs() {
        this.numerator = Math.abs(this.numerator);
        this.denominator = Math.abs(this.denominator);
        return this.reduce();
    }
    exprational(exponent) {
        this.numerator =
            exponent >= 0 ? Math.pow(this.numerator, exponent) : Math.pow(this.denominator, Math.abs(exponent));
        this.denominator =
            exponent >= 0 ? Math.pow(this.denominator, exponent) : Math.pow(this.numerator, Math.abs(exponent));
        return this.reduce();
    }
    expreal(realNumber) {
        return Number(Math.pow(Math.pow(realNumber, this.numerator), 1 / this.denominator).toPrecision(15));
    }
    reduce() {
        const gcd = this.gcd(this.numerator, this.denominator);
        this.numerator = this.numerator / gcd;
        this.denominator = this.denominator / gcd;
        if (this.denominator < 0) {
            this.numerator *= -1;
            this.denominator *= -1;
        }
        return this;
    }
    gcd(number1, number2) {
        const num1Abs = Math.abs(number1);
        const num2Abs = Math.abs(number2);
        if (num2Abs === 0) {
            return num1Abs;
        }
        return this.gcd(num2Abs, num1Abs % num2Abs);
    }
}
exports.Rational = Rational;
