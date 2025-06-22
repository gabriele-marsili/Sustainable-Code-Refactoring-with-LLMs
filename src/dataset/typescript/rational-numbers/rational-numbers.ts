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
    let numerator = this._a * rational.getB() + rational.getA() * this._b;
    let denominator = this._b * rational.getB();
    return this.reduce(numerator, denominator);
  }

  sub(rational: Rational) {
    let numerator = this._a * rational.getB() - rational.getA() * this._b;
    let denominator = this._b * rational.getB();
    return this.reduce(numerator, denominator);
  }

  mul(rational: Rational) {
    let numerator = this._a * rational.getA();
    let denominator = this._b * rational.getB();
    return this.reduce(numerator, denominator);
  }

  div(rational: Rational) {
    let numerator = this._a * rational.getB();
    let denominator = rational.getA() * this._b;
    return this.reduce(numerator, denominator);
  }

  abs() {
    let numerator = Math.abs(this._a);
    let denominator = Math.abs(this._b);
    return this.reduce(numerator, denominator);
  }

  exprational(power: number) {
    let numerator = Math.pow(this._a, power);
    let denominator = Math.pow(this._b, power);
    return this.reduce(numerator, denominator);
  }

  expreal(base: number) {
    let noRound = Math.pow(Math.pow(base, this._a), 1 / this._b);
    return noRound > 1 ? Math.round(noRound) : noRound;
  }

  reduce(a?: number, b?: number) {

    let reduceA = a !== undefined ? a : this._a;
    let reduceB = b !== undefined ? b : this._b;

    if(reduceA === 0) return new Rational(0,1);
    
    let gcd = 1;
   
    for(let pointer = 1; pointer <= Math.abs(reduceA) && pointer <= Math.abs(reduceB); pointer++) {
      if(reduceA % pointer === 0 && reduceB % pointer === 0) gcd = pointer;
    }

    //reduce
    reduceA /= gcd;
    reduceB /= gcd;

    //'b' is always positive and 'a' has the negative sign if that is the case
    reduceA = (reduceB/ Math.abs(reduceB)) * reduceA;
    reduceB = Math.abs(reduceB);
    
    return new Rational(reduceA, reduceB);
  }
}
