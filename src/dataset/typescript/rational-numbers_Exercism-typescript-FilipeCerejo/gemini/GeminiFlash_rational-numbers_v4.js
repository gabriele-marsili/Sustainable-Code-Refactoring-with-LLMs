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
        return this.reduce(this._a * rational.getB() + rational.getA() * this._b, this._b * rational.getB());
    }
    sub(rational) {
        return this.reduce(this._a * rational.getB() - rational.getA() * this._b, this._b * rational.getB());
    }
    mul(rational) {
        return this.reduce(this._a * rational.getA(), this._b * rational.getB());
    }
    div(rational) {
        return this.reduce(this._a * rational.getB(), this._b * rational.getA());
    }
    abs() {
        return this.reduce(Math.abs(this._a), Math.abs(this._b));
    }
    exprational(power) {
        return this.reduce(Math.pow(this._a, power), Math.pow(this._b, power));
    }
    expreal(base) {
        return Math.pow(base, this._a / this._b);
    }
    gcd(a, b) {
        a = Math.abs(a);
        b = Math.abs(b);
        if (b === 0) {
            return a;
        }
        return this.gcd(b, a % b);
    }
    reduce(a, b) {
        if (a === 0) {
            return new Rational(0, 1);
        }
        const commonDivisor = this.gcd(a, b);
        a /= commonDivisor;
        b /= commonDivisor;
        if (b < 0) {
            a = -a;
            b = -b;
        }
        return new Rational(a, b);
    }
}
exports.Rational = Rational;
