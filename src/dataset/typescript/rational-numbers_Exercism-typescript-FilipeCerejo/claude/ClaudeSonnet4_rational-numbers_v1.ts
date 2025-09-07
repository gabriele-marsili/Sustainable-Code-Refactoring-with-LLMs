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
    const numerator = Math.abs(this._a);
    const denominator = Math.abs(this._b);
    return this.reduce(numerator, denominator);
  }

  exprational(power: number) {
    const numerator = Math.pow(this._a, power);
    const denominator = Math.pow(this._b, power);
    return this.reduce(numerator, denominator);
  }

  expreal(base: number) {
    const noRound = Math.pow(Math.pow(base, this._a), 1 / this._b);
    return noRound > 1 ? Math.round(noRound) : noRound;
  }

  reduce(a?: number, b?: number) {
    let reduceA = a !== undefined ? a : this._a;
    let reduceB = b !== undefined ? b : this._b;

    if(reduceA === 0) return new Rational(0, 1);
    
    const gcd = this.gcd(Math.abs(reduceA), Math.abs(reduceB));

    reduceA /= gcd;
    reduceB /= gcd;

    if (reduceB < 0) {
      reduceA = -reduceA;
      reduceB = -reduceB;
    }
    
    return new Rational(reduceA, reduceB);
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