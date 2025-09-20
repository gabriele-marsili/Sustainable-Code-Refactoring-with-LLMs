"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rational = void 0;
class Rational {
    constructor(_a, _b) {
        this._a = _a;
        this._b = _b;
        if (_b === 0) {
            throw new Error("Denominator cannot be zero.");
        }
    }
    getA() {
        return this._a;
    }
    setA(value) {
        this._a = value;
    }
    getB() {
        return this._b;
    }
    setB(value) {
        if (value === 0) {
            throw new Error("Denominator cannot be zero.");
        }
        this._b = value;
    }
    add(rational) {
        const numerator = this._a * rational._b + rational._a * this._b;
        const denominator = this._b * rational._b;
        return Rational.reduce(numerator, denominator);
    }
    sub(rational) {
        const numerator = this._a * rational._b - rational._a * this._b;
        const denominator = this._b * rational._b;
        return Rational.reduce(numerator, denominator);
    }
    mul(rational) {
        const numerator = this._a * rational._a;
        const denominator = this._b * rational._b;
        return Rational.reduce(numerator, denominator);
    }
    div(rational) {
        if (rational._a === 0) {
            throw new Error("Cannot divide by zero.");
        }
        const numerator = this._a * rational._b;
        const denominator = this._b * rational._a;
        return Rational.reduce(numerator, denominator);
    }
    abs() {
        return new Rational(Math.abs(this._a), Math.abs(this._b));
    }
    exprational(power) {
        return Rational.reduce(Math.pow(this._a, power), Math.pow(this._b, power));
    }
    expreal(base) {
        if (base <= 0) {
            throw new Error("Base must be positive for real exponentiation.");
        }
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
