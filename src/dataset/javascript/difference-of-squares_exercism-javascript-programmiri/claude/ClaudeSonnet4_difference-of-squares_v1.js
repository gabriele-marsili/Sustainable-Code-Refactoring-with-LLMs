export class Squares {
  constructor(number) {
    this.number = number;
    this._sumOfSquares = null;
    this._squareOfSum = null;
  }

  get sumOfSquares() {
    if (this._sumOfSquares === null) {
      // Formula: n(n+1)(2n+1)/6
      const n = this.number;
      this._sumOfSquares = (n * (n + 1) * (2 * n + 1)) / 6;
    }
    return this._sumOfSquares;
  }

  get squareOfSum() {
    if (this._squareOfSum === null) {
      // Formula: (n(n+1)/2)^2
      const n = this.number;
      const sum = (n * (n + 1)) / 2;
      this._squareOfSum = sum * sum;
    }
    return this._squareOfSum;
  }

  get difference() {
    return this.squareOfSum - this.sumOfSquares;
  }
}