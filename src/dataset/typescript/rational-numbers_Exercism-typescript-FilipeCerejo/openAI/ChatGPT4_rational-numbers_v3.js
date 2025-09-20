"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rational = void 0;
class Rational {
    constructor(a, b) {
        const gcd = Rational.gcd(Math.abs(a), Math.abs(b));
        this._a = (b < 0 ? -a : a) / gcd;
        this._b = Math.abs(b) / gcd;
    }
    getA() {
        return this._a;
    }
    setA(value) {
        const gcd = Rational.gcd(Math.abs(value), Math.abs(this._b));
        this._a = (this._b < 0 ? -value : value) / gcd;
        this._b = Math.abs(this._b) / gcd;
    }
    getB() {
        return this._b;
    }
    setB(value) {
        const gcd = Rational.gcd(Math.abs(this._a), Math.abs(value));
        this._a = (value < 0 ? -this._a : this._a) / gcd;
        this._b = Math.abs(value) / gcd;
    }
    add(rational) {
        const numerator = this._a * rational._b + rational._a * this._b;
        const denominator = this._b * rational._b;
        return new Rational(numerator, denominator);
    }
    sub(rational) {
        const numerator = this._a * rational._b - rational._a * this._b;
        const denominator = this._b * rational._b;
        return new Rational(numerator, denominator);
    }
    mul(rational) {
        const numerator = this._a * rational._a;
        const denominator = this._b * rational._b;
        return new Rational(numerator, denominator);
    }
    div(rational) {
        const numerator = this._a * rational._b;
        const denominator = this._b * rational._a;
        return new Rational(numerator, denominator);
    }
    abs() {
        return new Rational(Math.abs(this._a), this._b);
    }
    exprational(power) {
        const numerator = Math.pow(this._a, power);
        const denominator = Math.pow(this._b, power);
        return new Rational(numerator, denominator);
    }
    expreal(base) {
        const result = Math.pow(base, this._a / this._b);
        return result > 1 ? Math.round(result) : result;
    }
    static gcd(a, b) {
        while (b !== 0) {
            [a, b] = [b, a % b];
        }
        return a;
    }
}
exports.Rational = Rational;
