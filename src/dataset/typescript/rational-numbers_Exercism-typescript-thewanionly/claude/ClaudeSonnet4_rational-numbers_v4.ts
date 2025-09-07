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
    const gcd = this.gcd(Math.abs(newNumerator), Math.abs(newDenominator))
    
    this.numerator = newNumerator / gcd
    this.denominator = newDenominator / gcd
    
    if (this.denominator < 0) {
      this.numerator *= -1
      this.denominator *= -1
    }
    
    return this
  }

  sub(rationalNumber: Rational): Rational {
    const newNumerator = this.numerator * rationalNumber.denominator - this.denominator * rationalNumber.numerator
    const newDenominator = this.denominator * rationalNumber.denominator
    const gcd = this.gcd(Math.abs(newNumerator), Math.abs(newDenominator))
    
    this.numerator = newNumerator / gcd
    this.denominator = newDenominator / gcd
    
    if (this.denominator < 0) {
      this.numerator *= -1
      this.denominator *= -1
    }
    
    return this
  }

  mul(rationalNumber: Rational): Rational {
    const newNumerator = this.numerator * rationalNumber.numerator
    const newDenominator = this.denominator * rationalNumber.denominator
    const gcd = this.gcd(Math.abs(newNumerator), Math.abs(newDenominator))
    
    this.numerator = newNumerator / gcd
    this.denominator = newDenominator / gcd
    
    if (this.denominator < 0) {
      this.numerator *= -1
      this.denominator *= -1
    }
    
    return this
  }

  div(rationalNumber: Rational): Rational {
    if (rationalNumber.numerator === 0) {
      throw new Error("Cannot divide by zero")
    }
    
    const newNumerator = this.numerator * rationalNumber.denominator
    const newDenominator = this.denominator * rationalNumber.numerator
    const gcd = this.gcd(Math.abs(newNumerator), Math.abs(newDenominator))
    
    this.numerator = newNumerator / gcd
    this.denominator = newDenominator / gcd
    
    if (this.denominator < 0) {
      this.numerator *= -1
      this.denominator *= -1
    }
    
    return this
  }

  abs(): Rational {
    this.numerator = Math.abs(this.numerator)
    return this
  }

  exprational(exponent: number): Rational {
    if (exponent === 0) {
      this.numerator = 1
      this.denominator = 1
      return this
    }
    
    if (exponent > 0) {
      this.numerator = this.numerator ** exponent
      this.denominator = this.denominator ** exponent
    } else {
      const absExponent = -exponent
      const tempNumerator = this.numerator
      this.numerator = this.denominator ** absExponent
      this.denominator = tempNumerator ** absExponent
    }
    
    return this.reduce()
  }

  expreal(realNumber: number): number {
    return Math.pow(realNumber, this.numerator / this.denominator)
  }

  reduce(): Rational {
    if (this.numerator === 0) {
      this.denominator = 1
      return this
    }
    
    const gcd = this.gcd(Math.abs(this.numerator), Math.abs(this.denominator))
    this.numerator /= gcd
    this.denominator /= gcd

    if (this.denominator < 0) {
      this.numerator *= -1
      this.denominator *= -1
    }

    return this
  }

  gcd(a: number, b: number): number {
    while (b !== 0) {
      const temp = b
      b = a % b
      a = temp
    }
    return a
  }
}