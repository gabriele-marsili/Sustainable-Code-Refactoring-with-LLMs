"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rational = void 0;
class Rational {
    constructor(numerator, denominator) {
        this.numerator = numerator;
        this.denominator = denominator;
    }
    add(rationalNumber) {
        const num = this.numerator * rationalNumber.denominator + this.denominator * rationalNumber.numerator;
        const den = this.denominator * rationalNumber.denominator;
        return new Rational(num, den).reduce();
    }
    sub(rationalNumber) {
        const num = this.numerator * rationalNumber.denominator - this.denominator * rationalNumber.numerator;
        const den = this.denominator * rationalNumber.denominator;
        return new Rational(num, den).reduce();
    }
    mul(rationalNumber) {
        const num = this.numerator * rationalNumber.numerator;
        const den = this.denominator * rationalNumber.denominator;
        return new Rational(num, den).reduce();
    }
    div(rationalNumber) {
        const num = this.numerator * rationalNumber.denominator;
        const den = this.denominator * rationalNumber.numerator;
        return new Rational(num, den).reduce();
    }
    abs() {
        return new Rational(Math.abs(this.numerator), Math.abs(this.denominator)).reduce();
    }
    exprational(exponent) {
        let num;
        let den;
        if (exponent >= 0) {
            num = Math.pow(this.numerator, exponent);
            den = Math.pow(this.denominator, exponent);
        }
        else {
            const absExponent = Math.abs(exponent);
            num = Math.pow(this.denominator, absExponent);
            den = Math.pow(this.numerator, absExponent);
        }
        return new Rational(num, den).reduce();
    }
    expreal(realNumber) {
        return Number(Math.pow(realNumber, this.numerator / this.denominator).toPrecision(15));
    }
    reduce() {
        let num = this.numerator;
        let den = this.denominator;
        const gcdVal = this.gcd(num, den);
        num /= gcdVal;
        den /= gcdVal;
        if (den < 0) {
            num *= -1;
            den *= -1;
        }
        this.numerator = num;
        this.denominator = den;
        return this;
    }
    gcd(a, b) {
        a = Math.abs(a);
        b = Math.abs(b);
        while (b) {
            const temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
}
exports.Rational = Rational;
