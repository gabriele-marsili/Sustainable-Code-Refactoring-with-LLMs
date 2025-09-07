//@ts-check

export class Squares {
  /**
   * @param {number} n
   */
  constructor(n) {
    this.n = n;
    this._sum = (n * (n + 1)) / 2;
    this._sumOfSquares = (n * (n + 1) * (2 * n + 1)) / 6;
  }

  get sumOfSquares() {
    return this._sumOfSquares;
  }

  get squareOfSum() {
    return this._sum * this._sum;
  }

  get difference() {
    return this._sum * this._sum - this._sumOfSquares;
  }
}