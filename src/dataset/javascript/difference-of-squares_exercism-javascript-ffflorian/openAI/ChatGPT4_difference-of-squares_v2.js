//@ts-check

export class Squares {
  /**
   * @param {number} n
   */
  constructor(n) {
    /** @type {number} */
    this.n = n;
    /** @type {number} */
    this._sum = (n * (n + 1)) / 2;
  }

  get sumOfSquares() {
    return (this.n * (this.n + 1) * (2 * this.n + 1)) / 6;
  }

  get squareOfSum() {
    return this._sum * this._sum;
  }

  get difference() {
    return this.squareOfSum - this.sumOfSquares;
  }
}