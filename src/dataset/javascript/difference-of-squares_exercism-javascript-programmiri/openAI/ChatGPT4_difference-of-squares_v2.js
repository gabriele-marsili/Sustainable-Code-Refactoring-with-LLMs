export class Squares {
  constructor(number) {
    this.number = number;
  }

  get sumOfSquares() {
    return (this.number * (this.number + 1) * (2 * this.number + 1)) / 6;
  }

  get squareOfSum() {
    const sum = (this.number * (this.number + 1)) / 2;
    return sum * sum;
  }

  get difference() {
    return this.squareOfSum - this.sumOfSquares;
  }
}