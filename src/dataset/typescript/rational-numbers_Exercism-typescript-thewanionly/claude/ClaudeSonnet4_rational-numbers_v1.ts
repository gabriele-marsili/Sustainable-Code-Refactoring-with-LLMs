export class Rational {
  private numerator: number
  private denominator: number

  constructor(numerator: number, denominator: number) {
    if (denominator === 0) {
      throw new Error("Denominator cannot be zero")
    }
    const g = this.gcd(Math.abs(numerator), Math.abs(denominator))
    this.numerator = denominator < 0 ? -numerator / g : numerator / g
    this.denominator = Math.abs(denominator) / g
  }

  add(rationalNumber: Rational): Rational {
    const newNum = this.numerator * rationalNumber.denominator + this.denominator * rationalNumber.numerator
    const newDen = this.denominator * rationalNumber.denominator
    const g = this.gcd(Math.abs(newNum), newDen)
    
    this.numerator = newNum / g
    this.denominator = newDen / g
    return this
  }

  sub(rationalNumber: Rational): Rational {
    const newNum = this.numerator * rationalNumber.denominator - this.denominator * rationalNumber.numerator
    const newDen = this.denominator * rationalNumber.denominator
    const g = this.gcd(Math.abs(newNum), newDen)
    
    this.numerator = newNum / g
    this.denominator = newDen / g
    return this
  }

  mul(rationalNumber: Rational): Rational {
    const newNum = this.numerator * rationalNumber.numerator
    const newDen = this.denominator * rationalNumber.denominator
    const g = this.gcd(Math.abs(newNum), newDen)
    
    this.numerator = newNum / g
    this.denominator = newDen / g
    return this
  }

  div(rationalNumber: Rational): Rational {
    if (rationalNumber.numerator === 0) {
      throw new Error("Division by zero")
    }
    const newNum = this.numerator * rationalNumber.denominator
    const newDen = this.denominator * rationalNumber.numerator
    const g = this.gcd(Math.abs(newNum), Math.abs(newDen))
    
    this.numerator = newDen < 0 ? -newNum / g : newNum / g
    this.denominator = Math.abs(newDen) / g
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
      const absExp = -exponent
      const temp = this.numerator ** absExp
      this.numerator = this.denominator ** absExp
      this.denominator = temp
    }
    
    return this.reduce()
  }

  expreal(realNumber: number): number {
    return realNumber ** (this.numerator / this.denominator)
  }

  reduce(): Rational {
    const g = this.gcd(Math.abs(this.numerator), this.denominator)
    this.numerator /= g
    this.denominator /= g
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