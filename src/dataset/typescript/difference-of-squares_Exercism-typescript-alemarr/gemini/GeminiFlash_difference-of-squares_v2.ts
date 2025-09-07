export class Squares {
  private sum: number;
  private sumOfSquaresValue: number;

  constructor(private number: number) {
    this.sum = (number * (number + 1)) / 2;
    this.sumOfSquaresValue = (number * (number + 1) * (2 * number + 1)) / 6;
  }

  get sumOfSquares(): number {
    return this.sumOfSquaresValue;
  }

  get squareOfSum(): number {
    return this.sum * this.sum;
  }

  get difference(): number {
    return this.squareOfSum - this.sumOfSquares;
  }
}