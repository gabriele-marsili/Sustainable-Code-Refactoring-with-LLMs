// -0 => 0
const avoidMinusZero = (x: number) => x ? x : 0

const greatestCommonDivisor = (a: number, b: number): number =>
    b ? greatestCommonDivisor(b, a % b) : a

export default class Rational {
    private readonly a: number
    private readonly b: number

    constructor(a: number, b: number) {
        const gcd = greatestCommonDivisor(a, b)
        this.a = avoidMinusZero(a / gcd)
        this.b = avoidMinusZero(b / gcd)
    }

    add(o: Rational) {
        const {a: a1, b: b1} = this
        const {a: a2, b: b2} = o
        return new Rational((a1 * b2 + a2 * b1), (b1 * b2))
    }

    sub(o: Rational) {
        return this.add(new Rational(-o.a, o.b))
    }

    mul(o: Rational) {
        return new Rational(this.a * o.a, this.b * o.b)
    }

    div(o: Rational) {
        return new Rational(this.a * o.b, this.b * o.a)
    }

    abs() {
        return new Rational(Math.abs(this.a), Math.abs(this.b))
    }

    reduce() {
        return this
    }

    exprational(n: number) {
        return new Rational(this.a ** n, this.b ** n)
    }

    expreal(n: number) {
        return 10.0 ** ((Math.log10(n ** this.a)) / this.b)
    }
}
