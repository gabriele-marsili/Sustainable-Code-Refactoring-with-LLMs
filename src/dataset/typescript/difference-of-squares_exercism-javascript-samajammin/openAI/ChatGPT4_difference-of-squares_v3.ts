export default class Squares {
  squareOfSum: number;
  sumOfSquares: number;
  difference: number;

  constructor(num: number) {
    const { squareOfSum, sumOfSquares } = this.calculate(num);
    this.squareOfSum = squareOfSum;
    this.sumOfSquares = sumOfSquares;
    this.difference = squareOfSum - sumOfSquares;
  }

  private calculate(num: number): { squareOfSum: number; sumOfSquares: number } {
    let sum = 0;
    let sumOfSquares = 0;
    for (let i = 1; i <= num; i++) {
      sum += i;
      sumOfSquares += i * i;
    }
    return { squareOfSum: sum * sum, sumOfSquares };
  }

  createFirstN(num: number): number[] {
    return Array.from({ length: num }, (_, i) => i + 1);
  }

  calcSquareOfSum(): number {
    return this.squareOfSum;
  }

  calcSumOfSquares(): number {
    return this.sumOfSquares;
  }
}