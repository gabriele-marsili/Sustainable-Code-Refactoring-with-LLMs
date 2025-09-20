"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rational = void 0;
class Rational {
    constructor(numerator, denominator) {
        this.numerator = numerator;
        this.denominator = denominator;
        this.reduce();
    }
    add(rationalNumber) {
        const num = this.numerator * rationalNumber.denominator + this.denominator * rationalNumber.numerator;
        const den = this.denominator * rationalNumber.denominator;
        return new Rational(num, den);
    }
    sub(rationalNumber) {
        const num = this.numerator * rationalNumber.denominator - this.denominator * rationalNumber.numerator;
        const den = this.denominator * rationalNumber.denominator;
        return new Rational(num, den);
    }
    mul(rationalNumber) {
        const num = this.numerator * rationalNumber.numerator;
        const den = this.denominator * rationalNumber.denominator;
        return new Rational(num, den);
    }
    div(rationalNumber) {
        const num = this.numerator * rationalNumber.denominator;
        const den = this.denominator * rationalNumber.numerator;
        return new Rational(num, den);
    }
    abs() {
        return new Rational(Math.abs(this.numerator), Math.abs(this.denominator));
    }
    exprational(exponent) {
        if (exponent === 0) {
            return new Rational(1, 1);
        }
        if (exponent > 0) {
            return new Rational(Math.pow(this.numerator, exponent), Math.pow(this.denominator, exponent));
        }
        else {
            const absExponent = Math.abs(exponent);
            return new Rational(Math.pow(this.denominator, absExponent), Math.pow(this.numerator, absExponent));
        }
    }
    expreal(realNumber) {
        return Math.pow(realNumber, this.numerator / this.denominator);
    }
    reduce() {
        const gcdValue = Rational.gcd(this.numerator, this.denominator);
        this.numerator /= gcdValue;
        this.denominator /= gcdValue;
        if (this.denominator < 0) {
            this.numerator *= -1;
            this.denominator *= -1;
        }
    }
    static gcd(a, b) {
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
