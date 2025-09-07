export class Rational {
  private numerator: number
  private denominator: number

  constructor(numerator: number, denominator: number) {
    if (denominator === 0) {
      throw new Error("Denominator cannot be zero")
    }
    
    const gcd = this.gcd(Math.abs(numerator), Math.abs(denominator))
    this.numerator = numerator / gcd
    this.denominator = denominator / gcd
    
    if (this.denominator < 0) {
      this.numerator *= -1
      this.denominator *= -1
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
    if (rationalNumber.numerator === 0) {
      throw new Error("Cannot divide by zero")
    }
    
    const newNumerator = this.numerator * rationalNumber.denominator
    const newDenominator = this.denominator * rationalNumber.numerator
    
    return new Rational(newNumerator, newDenominator)
  }

  abs(): Rational {
    return new Rational(Math.abs(this.numerator), this.denominator)
  }

  exprational(exponent: number): Rational {
    if (exponent === 0) {
      return new Rational(1, 1)
    }
    
    if (exponent > 0) {
      return new Rational(this.numerator ** exponent, this.denominator ** exponent)
    } else {
      const absExponent = -exponent
      return new Rational(this.denominator ** absExponent, this.numerator ** absExponent)
    }
  }

  expreal(realNumber: number): number {
    return Math.pow(realNumber, this.numerator / this.denominator)
  }

  reduce(): Rational {
    return this
  }

  gcd(a: number, b: number): number {
    a = Math.abs(a)
    b = Math.abs(b)
    
    while (b !== 0) {
      const temp = b
      b = a % b
      a = temp
    }
    
    return a
  }
}