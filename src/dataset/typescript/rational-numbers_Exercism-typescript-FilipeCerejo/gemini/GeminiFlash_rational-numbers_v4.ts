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

  add(rational: Rational): Rational {
    return this.reduce(this._a * rational.getB() + rational.getA() * this._b, this._b * rational.getB());
  }

  sub(rational: Rational): Rational {
    return this.reduce(this._a * rational.getB() - rational.getA() * this._b, this._b * rational.getB());
  }

  mul(rational: Rational): Rational {
    return this.reduce(this._a * rational.getA(), this._b * rational.getB());
  }

  div(rational: Rational): Rational {
    return this.reduce(this._a * rational.getB(), this._b * rational.getA());
  }

  abs(): Rational {
    return this.reduce(Math.abs(this._a), Math.abs(this._b));
  }

  exprational(power: number): Rational {
    return this.reduce(Math.pow(this._a, power), Math.pow(this._b, power));
  }

  expreal(base: number): number {
    return Math.pow(base, this._a / this._b);
  }

  private gcd(a: number, b: number): number {
    a = Math.abs(a);
    b = Math.abs(b);

    if (b === 0) {
      return a;
    }

    return this.gcd(b, a % b);
  }

  reduce(a: number, b: number): Rational {
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