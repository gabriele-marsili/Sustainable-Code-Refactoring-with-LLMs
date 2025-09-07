export default class Squares {
  squareOfSum: number;
  sumOfSquares: number;
  firstN: number[];
  difference: number;

  constructor(num: number) {
    this.firstN = this.createFirstN(num);
    const { squareOfSum, sumOfSquares } = this.calcBothSums(num);
    this.squareOfSum = squareOfSum;
    this.sumOfSquares = sumOfSquares;
    this.difference = this.squareOfSum - this.sumOfSquares;
  }

  createFirstN(num: number): number[] {
    return Array.from({ length: num }, (_, i) => i + 1);
  }

  calcSquareOfSum(): number {
    const sum = (this.firstN.length * (this.firstN.length + 1)) / 2;
    return sum ** 2;
  }

  calcSumOfSquares(): number {
    const n = this.firstN.length;
    return (n * (n + 1) * (2 * n + 1)) / 6;
  }

  private calcBothSums(num: number): { squareOfSum: number; sumOfSquares: number } {
    const sum = (num * (num + 1)) / 2;
    const sumOfSquares = (num * (num + 1) * (2 * num + 1)) / 6;
    return {
      squareOfSum: sum ** 2,
      sumOfSquares
    };
  }
}