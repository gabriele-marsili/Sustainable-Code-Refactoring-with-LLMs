//@ts-check

export class Squares {
  /**
   * @param {number} n
   */
  constructor(n) {
    /** @type {number} */
    this.n = n;
    
    const nPlus1 = n + 1;
    const sumFormula = (n * nPlus1) / 2;
    
    /** @type {number} */
    this._sumOfSquares = (n * nPlus1 * (2 * n + 1)) / 6;
    
    /** @type {number} */
    this._squareOfSum = sumFormula * sumFormula;
    
    /** @type {number} */
    this._difference = this._squareOfSum - this._sumOfSquares;
  }

  get sumOfSquares() {
    return this._sumOfSquares;
  }

  get squareOfSum() {
    return this._squareOfSum;
  }

  get difference() {
    return this._difference;
  }
}