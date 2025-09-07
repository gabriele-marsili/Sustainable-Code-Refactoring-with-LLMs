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
    return new Rational(num, den).reduce();
  }

  sub(rationalNumber: Rational): Rational {
    const num = this.numerator * rationalNumber.denominator - this.denominator * rationalNumber.numerator;
    const den = this.denominator * rationalNumber.denominator;
    return new Rational(num, den).reduce();
  }

  mul(rationalNumber: Rational): Rational {
    const num = this.numerator * rationalNumber.numerator;
    const den = this.denominator * rationalNumber.denominator;
    return new Rational(num, den).reduce();
  }

  div(rationalNumber: Rational): Rational {
    const num = this.numerator * rationalNumber.denominator;
    const den = this.denominator * rationalNumber.numerator;
    return new Rational(num, den).reduce();
  }

  abs(): Rational {
    return new Rational(Math.abs(this.numerator), Math.abs(this.denominator)).reduce();
  }

  exprational(exponent: number): Rational {
    let num: number;
    let den: number;

    if (exponent >= 0) {
      num = this.numerator ** exponent;
      den = this.denominator ** exponent;
    } else {
      const absExponent = Math.abs(exponent);
      num = this.denominator ** absExponent;
      den = this.numerator ** absExponent;
    }

    return new Rational(num, den).reduce();
  }

  expreal(realNumber: number): number {
    return Number(Math.pow(realNumber, this.numerator / this.denominator).toPrecision(15));
  }

  reduce(): Rational {
    let num = this.numerator;
    let den = this.denominator;
    const gcdVal = this.gcd(num, den);
    num /= gcdVal;
    den /= gcdVal;

    if (den < 0) {
      num *= -1;
      den *= -1;
    }

    this.numerator = num;
    this.denominator = den;
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