export class Squares {
  private readonly sumOfSquaresValue: number;
  private readonly squareOfSumValue: number;
  private readonly differenceValue: number;

  constructor(private readonly count: number) {
    const sum = (count * (count + 1)) / 2;
    this.squareOfSumValue = sum * sum;
    this.sumOfSquaresValue = (count * (count + 1) * (2 * count + 1)) / 6;
    this.differenceValue = this.squareOfSumValue - this.sumOfSquaresValue;
  }

  get sumOfSquares(): number {
    return this.sumOfSquaresValue;
  }

  get squareOfSum(): number {
    return this.squareOfSumValue;
  }

  get difference(): number {
    return this.differenceValue;
  }
}