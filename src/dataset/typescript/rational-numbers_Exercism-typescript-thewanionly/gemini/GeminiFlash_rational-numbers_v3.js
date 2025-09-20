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
        this.numerator = num;
        this.denominator = den;
        return this.reduce();
    }
    sub(rationalNumber) {
        const num = this.numerator * rationalNumber.denominator - this.denominator * rationalNumber.numerator;
        const den = this.denominator * rationalNumber.denominator;
        this.numerator = num;
        this.denominator = den;
        return this.reduce();
    }
    mul(rationalNumber) {
        this.numerator *= rationalNumber.numerator;
        this.denominator *= rationalNumber.denominator;
        return this.reduce();
    }
    div(rationalNumber) {
        this.numerator *= rationalNumber.denominator;
        this.denominator *= rationalNumber.numerator;
        return this.reduce();
    }
    abs() {
        this.numerator = Math.abs(this.numerator);
        this.denominator = Math.abs(this.denominator);
        return this.reduce();
    }
    exprational(exponent) {
        var _a, _b;
        if (exponent >= 0) {
            (_a = this).numerator = Math.pow(_a.numerator, exponent);
            (_b = this).denominator = Math.pow(_b.denominator, exponent);
        }
        else {
            const absExponent = Math.abs(exponent);
            this.numerator = Math.pow(this.denominator, absExponent);
            this.denominator = Math.pow(this.numerator, absExponent);
        }
        return this.reduce();
    }
    expreal(realNumber) {
        return Number(Math.pow(realNumber, this.numerator / this.denominator).toPrecision(15));
    }
    reduce() {
        const gcdValue = this.gcd(this.numerator, this.denominator);
        if (gcdValue !== 1) {
            this.numerator /= gcdValue;
            this.denominator /= gcdValue;
        }
        if (this.denominator < 0) {
            this.numerator = -this.numerator;
            this.denominator = -this.denominator;
        }
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
