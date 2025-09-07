export class Squares {
  constructor(private number: number) {}

  get sumOfSquares(): number {
    return (this.number * (this.number + 1) * (2 * this.number + 1)) / 6;
  }

  get squareOfSum(): number {
    const sum = (this.number * (this.number + 1)) / 2;
    return sum * sum;
  }

  get difference(): number {
    return this.squareOfSum - this.sumOfSquares;
  }
}