export class Squares {
  private readonly sum: number;
  private readonly sumOfSquaresValue: number;
  private readonly squareOfSumValue: number;

  constructor(public readonly count: number) {
    this.sum = (count * (count + 1)) / 2;
    this.sumOfSquaresValue = (count * (count + 1) * (2 * count + 1)) / 6;
    this.squareOfSumValue = this.sum * this.sum;
  }

  get sumOfSquares(): number {
    return this.sumOfSquaresValue;
  }

  get squareOfSum(): number {
    return this.squareOfSumValue;
  }

  get difference(): number {
    return this.squareOfSumValue - this.sumOfSquaresValue;
  }
}