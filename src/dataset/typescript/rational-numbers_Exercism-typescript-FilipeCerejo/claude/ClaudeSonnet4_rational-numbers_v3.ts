export class Rational {

  private _a: number;
  private _b: number;
  
  constructor(a: number, b: number) {
    if (b === 0) throw new Error("Denominator cannot be zero");
    const reduced = this.gcd(Math.abs(a), Math.abs(b));
    this._a = (b < 0 ? -a : a) / reduced;
    this._b = Math.abs(b) / reduced;
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
    if (rational._a === 0) throw new Error("Cannot divide by zero");
    const numerator = this._a * rational._b;
    const denominator = rational._a * this._b;
    return this.reduce(numerator, denominator);
  }

  abs() {
    return new Rational(Math.abs(this._a), this._b);
  }

  exprational(power: number) {
    if (power === 0) return new Rational(1, 1);
    if (power === 1) return new Rational(this._a, this._b);
    
    const numerator = Math.pow(this._a, power);
    const denominator = Math.pow(this._b, power);
    return this.reduce(numerator, denominator);
  }

  expreal(base: number) {
    const result = Math.pow(base, this._a / this._b);
    return result > 1 ? Math.round(result) : result;
  }

  reduce(a?: number, b?: number) {
    const reduceA = a !== undefined ? a : this._a;
    const reduceB = b !== undefined ? b : this._b;

    if (reduceA === 0) return new Rational(0, 1);
    
    const gcdValue = this.gcd(Math.abs(reduceA), Math.abs(reduceB));
    const finalA = (reduceB < 0 ? -reduceA : reduceA) / gcdValue;
    const finalB = Math.abs(reduceB) / gcdValue;
    
    return new Rational(finalA, finalB);
  }

  private gcd(a: number, b: number): number {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }
}