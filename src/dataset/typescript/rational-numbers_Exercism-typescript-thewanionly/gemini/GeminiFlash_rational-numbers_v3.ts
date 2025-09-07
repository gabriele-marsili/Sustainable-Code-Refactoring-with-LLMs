export class Rational {
  private numerator: number;
  private denominator: number;

  constructor(numerator: number, denominator: number) {
    this.numerator = numerator;
    this.denominator = denominator;
  }

  add(rationalNumber: Rational): Rational {
    const num = this.numerator * rationalNumber.denominator + this.denominator * rationalNumber.numerator;
    const den = this.denominator * rationalNumber.denominator;
    this.numerator = num;
    this.denominator = den;
    return this.reduce();
  }

  sub(rationalNumber: Rational): Rational {
    const num = this.numerator * rationalNumber.denominator - this.denominator * rationalNumber.numerator;
    const den = this.denominator * rationalNumber.denominator;
    this.numerator = num;
    this.denominator = den;
    return this.reduce();
  }

  mul(rationalNumber: Rational): Rational {
    this.numerator *= rationalNumber.numerator;
    this.denominator *= rationalNumber.denominator;
    return this.reduce();
  }

  div(rationalNumber: Rational): Rational {
    this.numerator *= rationalNumber.denominator;
    this.denominator *= rationalNumber.numerator;
    return this.reduce();
  }

  abs(): Rational {
    this.numerator = Math.abs(this.numerator);
    this.denominator = Math.abs(this.denominator);
    return this.reduce();
  }

  exprational(exponent: number): Rational {
    if (exponent >= 0) {
      this.numerator **= exponent;
      this.denominator **= exponent;
    } else {
      const absExponent = Math.abs(exponent);
      this.numerator = this.denominator ** absExponent;
      this.denominator = this.numerator ** absExponent;
    }
    return this.reduce();
  }

  expreal(realNumber: number): number {
    return Number(Math.pow(realNumber, this.numerator / this.denominator).toPrecision(15));
  }

  reduce(): Rational {
    const gcdValue = this.gcd(this.numerator, this.denominator);
    if (gcdValue !== 1) {
      this.numerator /= gcdValue;
      this.denominator /= gcdValue;
    }

    if (this.denominator < 0) {
      this.numerator = -this.numerator;
      this.denominator = -this.denominator;
    }

    return this;
  }

  private gcd(a: number, b: number): number {
    a = Math.abs(a);
    b = Math.abs(b);

    while (b) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }
}