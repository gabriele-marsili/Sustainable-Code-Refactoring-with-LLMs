export class Squares {
  private readonly count: number;
  private readonly sum: number;
  private readonly sumOfSquaresValue: number;

  constructor(count: number) {
    this.count = count;
    this.sum = (count * (count + 1)) / 2;
    this.sumOfSquaresValue = (count * (count + 1) * (2 * count + 1)) / 6;
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