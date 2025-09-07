export default class Squares {
  squareOfSum: number;
  sumOfSquares: number;
  difference: number;

  constructor(num: number) {
    this.squareOfSum = this.calcSquareOfSum(num);
    this.sumOfSquares = this.calcSumOfSquares(num);
    this.difference = this.squareOfSum - this.sumOfSquares;
  }

  calcSquareOfSum(num: number): number {
    const sum = (num * (num + 1)) / 2;
    return sum * sum;
  }

  calcSumOfSquares(num: number): number {
    return (num * (num + 1) * (2 * num + 1)) / 6;
  }
}