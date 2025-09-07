export class Rational {
  private numerator: number
  private denominator: number

  constructor(numerator: number, denominator: number) {
    if (denominator === 0) throw new Error("Denominator cannot be zero")
    
    const g = this.gcd(Math.abs(numerator), Math.abs(denominator))
    this.numerator = numerator / g
    this.denominator = denominator / g
    
    if (this.denominator < 0) {
      this.numerator = -this.numerator
      this.denominator = -this.denominator
    }
  }

  add(rationalNumber: Rational): Rational {
    const newNumerator = this.numerator * rationalNumber.denominator + this.denominator * rationalNumber.numerator
    const newDenominator = this.denominator * rationalNumber.denominator
    return new Rational(newNumerator, newDenominator)
  }

  sub(rationalNumber: Rational): Rational {
    const newNumerator = this.numerator * rationalNumber.denominator - this.denominator * rationalNumber.numerator
    const newDenominator = this.denominator * rationalNumber.denominator
    return new Rational(newNumerator, newDenominator)
  }

  mul(rationalNumber: Rational): Rational {
    const newNumerator = this.numerator * rationalNumber.numerator
    const newDenominator = this.denominator * rationalNumber.denominator
    return new Rational(newNumerator, newDenominator)
  }

  div(rationalNumber: Rational): Rational {
    if (rationalNumber.numerator === 0) throw new Error("Cannot divide by zero")
    const newNumerator = this.numerator * rationalNumber.denominator
    const newDenominator = this.denominator * rationalNumber.numerator
    return new Rational(newNumerator, newDenominator)
  }

  abs(): Rational {
    return new Rational(Math.abs(this.numerator), this.denominator)
  }

  exprational(exponent: number): Rational {
    if (exponent === 0) return new Rational(1, 1)
    if (exponent > 0) {
      return new Rational(this.numerator ** exponent, this.denominator ** exponent)
    } else {
      const absExp = -exponent
      return new Rational(this.denominator ** absExp, this.numerator ** absExp)
    }
  }

  expreal(realNumber: number): number {
    return Math.pow(realNumber, this.numerator / this.denominator)
  }

  reduce(): Rational {
    return this
  }

  private gcd(a: number, b: number): number {
    while (b !== 0) {
      const temp = b
      b = a % b
      a = temp
    }
    return a
  }
}