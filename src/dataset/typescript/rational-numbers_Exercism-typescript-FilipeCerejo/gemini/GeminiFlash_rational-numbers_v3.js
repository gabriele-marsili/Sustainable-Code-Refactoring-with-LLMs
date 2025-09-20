"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rational = void 0;
class Rational {
    constructor(a, b) {
        if (b === 0) {
            throw new Error("Denominator cannot be zero.");
        }
        this._a = a;
        this._b = b;
    }
    get a() {
        return this._a;
    }
    get b() {
        return this._b;
    }
    add(rational) {
        const numerator = this._a * rational.b + rational.a * this._b;
        const denominator = this._b * rational.b;
        return Rational.reduce(numerator, denominator);
    }
    sub(rational) {
        const numerator = this._a * rational.b - rational.a * this._b;
        const denominator = this._b * rational.b;
        return Rational.reduce(numerator, denominator);
    }
    mul(rational) {
        const numerator = this._a * rational.a;
        const denominator = this._b * rational.b;
        return Rational.reduce(numerator, denominator);
    }
    div(rational) {
        if (rational.a === 0) {
            throw new Error("Cannot divide by zero.");
        }
        const numerator = this._a * rational.b;
        const denominator = rational.a * this._b;
        return Rational.reduce(numerator, denominator);
    }
    abs() {
        return new Rational(Math.abs(this._a), Math.abs(this._b));
    }
    exprational(power) {
        const numerator = Math.pow(this._a, power);
        const denominator = Math.pow(this._b, power);
        return Rational.reduce(numerator, denominator);
    }
    expreal(base) {
        return Math.pow(base, this._a / this._b);
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
    static reduce(a, b) {
        if (a === 0) {
            return new Rational(0, 1);
        }
        const gcdValue = Rational.gcd(a, b);
        a /= gcdValue;
        b /= gcdValue;
        if (b < 0) {
            a = -a;
            b = -b;
        }
        return new Rational(a, b);
    }
}
exports.Rational = Rational;
