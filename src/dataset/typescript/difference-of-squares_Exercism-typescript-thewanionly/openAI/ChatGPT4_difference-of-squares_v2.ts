export class Squares {
  private readonly sumOfN: number;
  private readonly sumOfNSquares: number;

  constructor(count: number) {
    this.sumOfN = (count * (count + 1)) / 2;
    this.sumOfNSquares = (count * (count + 1) * (2 * count + 1)) / 6;
  }

  get sumOfSquares(): number {
    return this.sumOfNSquares;
  }

  get squareOfSum(): number {
    return this.sumOfN * this.sumOfN;
  }

  get difference(): number {
    return this.squareOfSum - this.sumOfSquares;
  }
}