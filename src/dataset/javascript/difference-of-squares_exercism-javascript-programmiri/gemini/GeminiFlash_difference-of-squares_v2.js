export class Squares {
  constructor(number) {
    this.number = number;
  }

  get sumOfSquares() {
    const n = this.number;
    return (n * (n + 1) * (2 * n + 1)) / 6;
  }

  get squareOfSum() {
    const n = this.number;
    const sum = (n * (n + 1)) / 2;
    return sum * sum;
  }

  get difference() {
    return this.squareOfSum - this.sumOfSquares;
  }
}