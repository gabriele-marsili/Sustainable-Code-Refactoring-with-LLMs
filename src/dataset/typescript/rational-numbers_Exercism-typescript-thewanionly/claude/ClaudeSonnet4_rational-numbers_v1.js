"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rational = void 0;
class Rational {
    constructor(numerator, denominator) {
        if (denominator === 0) {
            throw new Error("Denominator cannot be zero");
        }
        const g = this.gcd(Math.abs(numerator), Math.abs(denominator));
        this.numerator = denominator < 0 ? -numerator / g : numerator / g;
        this.denominator = Math.abs(denominator) / g;
    }
    add(rationalNumber) {
        const newNum = this.numerator * rationalNumber.denominator + this.denominator * rationalNumber.numerator;
        const newDen = this.denominator * rationalNumber.denominator;
        const g = this.gcd(Math.abs(newNum), newDen);
        this.numerator = newNum / g;
        this.denominator = newDen / g;
        return this;
    }
    sub(rationalNumber) {
        const newNum = this.numerator * rationalNumber.denominator - this.denominator * rationalNumber.numerator;
        const newDen = this.denominator * rationalNumber.denominator;
        const g = this.gcd(Math.abs(newNum), newDen);
        this.numerator = newNum / g;
        this.denominator = newDen / g;
        return this;
    }
    mul(rationalNumber) {
        const newNum = this.numerator * rationalNumber.numerator;
        const newDen = this.denominator * rationalNumber.denominator;
        const g = this.gcd(Math.abs(newNum), newDen);
        this.numerator = newNum / g;
        this.denominator = newDen / g;
        return this;
    }
    div(rationalNumber) {
        if (rationalNumber.numerator === 0) {
            throw new Error("Division by zero");
        }
        const newNum = this.numerator * rationalNumber.denominator;
        const newDen = this.denominator * rationalNumber.numerator;
        const g = this.gcd(Math.abs(newNum), Math.abs(newDen));
        this.numerator = newDen < 0 ? -newNum / g : newNum / g;
        this.denominator = Math.abs(newDen) / g;
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
            const absExp = -exponent;
            const temp = Math.pow(this.numerator, absExp);
            this.numerator = Math.pow(this.denominator, absExp);
            this.denominator = temp;
        }
        return this.reduce();
    }
    expreal(realNumber) {
        return Math.pow(realNumber, (this.numerator / this.denominator));
    }
    reduce() {
        const g = this.gcd(Math.abs(this.numerator), this.denominator);
        this.numerator /= g;
        this.denominator /= g;
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
