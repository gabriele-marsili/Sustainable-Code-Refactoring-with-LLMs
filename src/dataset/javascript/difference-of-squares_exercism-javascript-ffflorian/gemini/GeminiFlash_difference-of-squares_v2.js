//@ts-check

export class Squares {
  /**
   * @param {number} n
   */
  constructor(n) {
    /** @type {number} */
    this.n = n;
  }

  get sumOfSquares() {
    const n = this.n;
    return (n * (n + 1) * (2 * n + 1)) / 6;
  }

  get squareOfSum() {
    const n = this.n;
    const sum = (n * (n + 1)) / 2;
    return sum * sum;
  }

  get difference() {
    return this.squareOfSum - this.sumOfSquares;
  }
}