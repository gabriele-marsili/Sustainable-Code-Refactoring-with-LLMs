//@ts-check

export class Squares {
  /**
   * @param {number} n
   */
  constructor(n) {
    /** @type {number} */
    this.n = n;
    
    const nPlus1 = n + 1;
    const nTimesNPlus1 = n * nPlus1;
    
    /** @type {number} */
    this._sumOfSquares = (nTimesNPlus1 * (2 * n + 1)) / 6;
    
    /** @type {number} */
    this._squareOfSum = (nTimesNPlus1 / 2) ** 2;
    
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