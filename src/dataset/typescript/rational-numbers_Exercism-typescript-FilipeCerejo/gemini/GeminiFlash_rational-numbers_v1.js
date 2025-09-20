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
        return new Rational(Math.abs(this._a), Math.abs(this._b)).reduce();
    }
    exprational(power) {
        const numerator = Math.pow(this._a, power);
        const denominator = Math.pow(this._b, power);
        return this.reduce(numerator, denominator);
    }
    expreal(base) {
        const noRound = Math.pow(base, this._a / this._b);
        return noRound > 1 ? Math.round(noRound) : noRound;
    }
    gcd(a, b) {
        a = Math.abs(a);
        b = Math.abs(b);
        if (b === 0) {
            return a;
        }
        return this.gcd(b, a % b);
    }
    reduce(a = this._a, b = this._b) {
        if (a === 0)
            return new Rational(0, 1);
        const greatestCommonDivisor = this.gcd(a, b);
        const reducedA = a / greatestCommonDivisor;
        const reducedB = b / greatestCommonDivisor;
        // Ensure b is positive
        if (reducedB < 0) {
            return new Rational(-reducedA, -reducedB);
        }
        return new Rational(reducedA, reducedB);
    }
}
exports.Rational = Rational;
