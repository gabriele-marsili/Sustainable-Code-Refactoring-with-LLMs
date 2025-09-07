export class Rational {

  private _a: number;
  private _b: number;

  constructor(a: number, b: number) {
    this._a = a;
    this._b = b;
  }

  public getA(): number {
    return this._a;
  }

  public setA(value: number) {
    this._a = value;
  }

  public getB(): number {
    return this._b;
  }

  public setB(value: number) {
    this._b = value;
  }

  add(rational: Rational) {
    const numerator = this._a * rational._b + rational._a * this._b;
    const denominator = this._b * rational._b;
    return this.reduce(numerator, denominator);
  }

  sub(rational: Rational) {
    const numerator = this._a * rational._b - rational._a * this._b;
    const denominator = this._b * rational._b;
    return this.reduce(numerator, denominator);
  }

  mul(rational: Rational) {
    const numerator = this._a * rational._a;
    const denominator = this._b * rational._b;
    return this.reduce(numerator, denominator);
  }

  div(rational: Rational) {
    const numerator = this._a * rational._b;
    const denominator = rational._a * this._b;
    return this.reduce(numerator, denominator);
  }

  abs() {
    return new Rational(Math.abs(this._a), Math.abs(this._b)).reduce();
  }

  exprational(power: number) {
    const numerator = Math.pow(this._a, power);
    const denominator = Math.pow(this._b, power);
    return this.reduce(numerator, denominator);
  }

  expreal(base: number) {
    const noRound = Math.pow(base, this._a / this._b);
    return noRound > 1 ? Math.round(noRound) : noRound;
  }

  private gcd(a: number, b: number): number {
    a = Math.abs(a);
    b = Math.abs(b);

    if (b === 0) {
      return a;
    }

    return this.gcd(b, a % b);
  }

  reduce(a: number = this._a, b: number = this._b): Rational {
    if (a === 0) return new Rational(0, 1);

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