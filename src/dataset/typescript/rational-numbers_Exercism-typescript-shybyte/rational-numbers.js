"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// -0 => 0
const avoidMinusZero = (x) => x ? x : 0;
const greatestCommonDivisor = (a, b) => b ? greatestCommonDivisor(b, a % b) : a;
class Rational {
    constructor(a, b) {
        const gcd = greatestCommonDivisor(a, b);
        this.a = avoidMinusZero(a / gcd);
        this.b = avoidMinusZero(b / gcd);
    }
    add(o) {
        const { a: a1, b: b1 } = this;
        const { a: a2, b: b2 } = o;
        return new Rational((a1 * b2 + a2 * b1), (b1 * b2));
    }
    sub(o) {
        return this.add(new Rational(-o.a, o.b));
    }
    mul(o) {
        return new Rational(this.a * o.a, this.b * o.b);
    }
    div(o) {
        return new Rational(this.a * o.b, this.b * o.a);
    }
    abs() {
        return new Rational(Math.abs(this.a), Math.abs(this.b));
    }
    reduce() {
        return this;
    }
    exprational(n) {
        return new Rational(Math.pow(this.a, n), Math.pow(this.b, n));
    }
    expreal(n) {
        return Math.pow(10.0, ((Math.log10(Math.pow(n, this.a))) / this.b));
    }
}
exports.default = Rational;
