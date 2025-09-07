export class Rational {
  private numerator: number;
  private denominator: number;

  constructor(numerator: number, denominator: number) {
    this.numerator = numerator;
    this.denominator = denominator;
    this.reduce();
  }

  add(rationalNumber: Rational): Rational {
    const num = this.numerator * rationalNumber.denominator + this.denominator * rationalNumber.numerator;
    const den = this.denominator * rationalNumber.denominator;
    return new Rational(num, den);
  }

  sub(rationalNumber: Rational): Rational {
    const num = this.numerator * rationalNumber.denominator - this.denominator * rationalNumber.numerator;
    const den = this.denominator * rationalNumber.denominator;
    return new Rational(num, den);
  }

  mul(rationalNumber: Rational): Rational {
    const num = this.numerator * rationalNumber.numerator;
    const den = this.denominator * rationalNumber.denominator;
    return new Rational(num, den);
  }

  div(rationalNumber: Rational): Rational {
    const num = this.numerator * rationalNumber.denominator;
    const den = this.denominator * rationalNumber.numerator;
    return new Rational(num, den);
  }

  abs(): Rational {
    return new Rational(Math.abs(this.numerator), Math.abs(this.denominator));
  }

  exprational(exponent: number): Rational {
    if (exponent === 0) {
      return new Rational(1, 1);
    }

    if (exponent > 0) {
      return new Rational(this.numerator ** exponent, this.denominator ** exponent);
    } else {
      const absExponent = Math.abs(exponent);
      return new Rational(this.denominator ** absExponent, this.numerator ** absExponent);
    }
  }

  expreal(realNumber: number): number {
    return Math.pow(realNumber, this.numerator / this.denominator);
  }

  private reduce(): void {
    const gcdValue = Rational.gcd(this.numerator, this.denominator);
    this.numerator /= gcdValue;
    this.denominator /= gcdValue;

    if (this.denominator < 0) {
      this.numerator *= -1;
      this.denominator *= -1;
    }
  }

  private static gcd(a: number, b: number): number {
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