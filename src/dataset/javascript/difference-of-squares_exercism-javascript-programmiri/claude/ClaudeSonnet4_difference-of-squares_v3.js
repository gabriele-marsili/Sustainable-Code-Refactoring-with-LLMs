export class Squares {
  constructor(number) {
    this.number = number;
    this._sumOfSquares = null;
    this._squareOfSum = null;
  }

  get sumOfSquares() {
    if (this._sumOfSquares === null) {
      this._sumOfSquares = (this.number * (this.number + 1) * (2 * this.number + 1)) / 6;
    }
    return this._sumOfSquares;
  }

  get squareOfSum() {
    if (this._squareOfSum === null) {
      const sum = (this.number * (this.number + 1)) / 2;
      this._squareOfSum = sum * sum;
    }
    return this._squareOfSum;
  }

  get difference() {
    return this.squareOfSum - this.sumOfSquares;
  }
}