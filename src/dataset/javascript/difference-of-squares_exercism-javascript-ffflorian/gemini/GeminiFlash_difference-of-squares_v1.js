//@ts-check

export class Squares {
  /**
   * @param {number} n
   */
  constructor(n) {
    /** @type {number} */
    this.n = n;
    this._sumOfSquares = (n * (n + 1) * (2 * n + 1)) / 6;
    const sum = (n * (n + 1)) / 2;
    this._squareOfSum = sum * sum;
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