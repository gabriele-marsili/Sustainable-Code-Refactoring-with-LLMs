"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rational = void 0;
class Rational {
    constructor(numerator, denominator) {
        const gcd = Rational.gcd(numerator, denominator);
        this.numerator = numerator / gcd;
        this.denominator = denominator / gcd;
        if (this.denominator < 0) {
            this.numerator *= -1;
            this.denominator *= -1;
        }
    }
    add(rationalNumber) {
        const numerator = this.numerator * rationalNumber.denominator + this.denominator * rationalNumber.numerator;
        const denominator = this.denominator * rationalNumber.denominator;
        return new Rational(numerator, denominator);
    }
    sub(rationalNumber) {
        const numerator = this.numerator * rationalNumber.denominator - this.denominator * rationalNumber.numerator;
        const denominator = this.denominator * rationalNumber.denominator;
        return new Rational(numerator, denominator);
    }
    mul(rationalNumber) {
        const numerator = this.numerator * rationalNumber.numerator;
        const denominator = this.denominator * rationalNumber.denominator;
        return new Rational(numerator, denominator);
    }
    div(rationalNumber) {
        const numerator = this.numerator * rationalNumber.denominator;
        const denominator = this.denominator * rationalNumber.numerator;
        return new Rational(numerator, denominator);
    }
    abs() {
        return new Rational(Math.abs(this.numerator), Math.abs(this.denominator));
    }
    exprational(exponent) {
        if (exponent === 0)
            return new Rational(1, 1);
        const numerator = exponent >= 0 ? Math.pow(this.numerator, exponent) : Math.pow(this.denominator, -exponent);
        const denominator = exponent >= 0 ? Math.pow(this.denominator, exponent) : Math.pow(this.numerator, -exponent);
        return new Rational(numerator, denominator);
    }
    expreal(realNumber) {
        return Number((Math.pow(realNumber, (this.numerator / this.denominator))).toPrecision(15));
    }
    static gcd(number1, number2) {
        while (number2 !== 0) {
            const temp = number2;
            number2 = number1 % number2;
            number1 = temp;
        }
        return Math.abs(number1);
    }
}
exports.Rational = Rational;
