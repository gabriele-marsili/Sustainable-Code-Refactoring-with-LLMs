//@ts-check

export class Squares {
  /**
   * @param {number} n
   */
  constructor(n) {
    /** @type {number} */
    this.n = n;
    
    // Pre-calculate common expressions
    /** @type {number} */
    this._nPlus1 = n + 1;
    /** @type {number} */
    this._sumFormula = (n * this._nPlus1) / 2;
    
    // Cache computed values
    /** @type {number|undefined} */
    this._sumOfSquares = undefined;
    /** @type {number|undefined} */
    this._squareOfSum = undefined;
    /** @type {number|undefined} */
    this._difference = undefined;
  }

  get sumOfSquares() {
    if (this._sumOfSquares === undefined) {
      this._sumOfSquares = (this.n * this._nPlus1 * (2 * this.n + 1)) / 6;
    }
    return this._sumOfSquares;
  }

  get squareOfSum() {
    if (this._squareOfSum === undefined) {
      this._squareOfSum = this._sumFormula * this._sumFormula;
    }
    return this._squareOfSum;
  }

  get difference() {
    if (this._difference === undefined) {
      this._difference = this.squareOfSum - this.sumOfSquares;
    }
    return this._difference;
  }
}