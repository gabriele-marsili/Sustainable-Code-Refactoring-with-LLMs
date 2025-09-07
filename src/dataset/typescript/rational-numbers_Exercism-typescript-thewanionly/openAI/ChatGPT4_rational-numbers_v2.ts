export class Rational {
  private numerator: number;
  private denominator: number;

  constructor(numerator: number, denominator: number) {
    const gcd = Rational.gcd(numerator, denominator);
    this.numerator = numerator / gcd;
    this.denominator = denominator / gcd;

    if (this.denominator < 0) {
      this.numerator *= -1;
      this.denominator *= -1;
    }
  }

  add(rationalNumber: Rational): Rational {
    const numerator =
      this.numerator * rationalNumber.denominator + this.denominator * rationalNumber.numerator;
    const denominator = this.denominator * rationalNumber.denominator;
    return new Rational(numerator, denominator);
  }

  sub(rationalNumber: Rational): Rational {
    const numerator =
      this.numerator * rationalNumber.denominator - this.denominator * rationalNumber.numerator;
    const denominator = this.denominator * rationalNumber.denominator;
    return new Rational(numerator, denominator);
  }

  mul(rationalNumber: Rational): Rational {
    const numerator = this.numerator * rationalNumber.numerator;
    const denominator = this.denominator * rationalNumber.denominator;
    return new Rational(numerator, denominator);
  }

  div(rationalNumber: Rational): Rational {
    const numerator = this.numerator * rationalNumber.denominator;
    const denominator = this.denominator * rationalNumber.numerator;
    return new Rational(numerator, denominator);
  }

  abs(): Rational {
    return new Rational(Math.abs(this.numerator), Math.abs(this.denominator));
  }

  exprational(exponent: number): Rational {
    if (exponent === 0) return new Rational(1, 1);
    const numerator = exponent >= 0 ? this.numerator ** exponent : this.denominator ** -exponent;
    const denominator = exponent >= 0 ? this.denominator ** exponent : this.numerator ** -exponent;
    return new Rational(numerator, denominator);
  }

  expreal(realNumber: number): number {
    return Number((realNumber ** (this.numerator / this.denominator)).toPrecision(15));
  }

  private static gcd(number1: number, number2: number): number {
    let a = Math.abs(number1);
    let b = Math.abs(number2);
    while (b !== 0) {
      [a, b] = [b, a % b];
    }
    return a;
  }
}