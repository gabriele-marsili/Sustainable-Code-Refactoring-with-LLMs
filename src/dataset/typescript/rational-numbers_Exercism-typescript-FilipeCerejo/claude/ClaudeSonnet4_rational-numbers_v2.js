"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rational = void 0;
class Rational {
    constructor(a, b) {
        this._a = a;
        this._b = b;
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
        this._b = value;
    }
    add(rational) {
        const numerator = this._a * rational._b + rational._a * this._b;
        const denominator = this._b * rational._b;
        return this.reduce(numerator, denominator);
    }
    sub(rational) {
        const numerator = this._a * rational._b - rational._a * this._b;
        const denominator = this._b * rational._b;
        return this.reduce(numerator, denominator);
    }
    mul(rational) {
        const numerator = this._a * rational._a;
        const denominator = this._b * rational._b;
        return this.reduce(numerator, denominator);
    }
    div(rational) {
        const numerator = this._a * rational._b;
        const denominator = rational._a * this._b;
        return this.reduce(numerator, denominator);
    }
    abs() {
        const numerator = Math.abs(this._a);
        const denominator = Math.abs(this._b);
        return this.reduce(numerator, denominator);
    }
    exprational(power) {
        const numerator = Math.pow(this._a, power);
        const denominator = Math.pow(this._b, power);
        return this.reduce(numerator, denominator);
    }
    expreal(base) {
        const noRound = Math.pow(Math.pow(base, this._a), 1 / this._b);
        return noRound > 1 ? Math.round(noRound) : noRound;
    }
    gcd(a, b) {
        a = Math.abs(a);
        b = Math.abs(b);
        while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
    reduce(a, b) {
        let reduceA = a !== undefined ? a : this._a;
        let reduceB = b !== undefined ? b : this._b;
        if (reduceA === 0)
            return new Rational(0, 1);
        const gcdValue = this.gcd(reduceA, reduceB);
        reduceA /= gcdValue;
        reduceB /= gcdValue;
        if (reduceB < 0) {
            reduceA = -reduceA;
            reduceB = -reduceB;
        }
        return new Rational(reduceA, reduceB);
    }
}
exports.Rational = Rational;
