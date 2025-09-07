export default class Squares {
  squareOfSum: number;
  sumOfSquares: number;
  difference: number;

  constructor(num: number) {
    const sum = (num * (num + 1)) / 2;
    const sumOfSquares = (num * (num + 1) * (2 * num + 1)) / 6;
    this.squareOfSum = sum ** 2;
    this.sumOfSquares = sumOfSquares;
    this.difference = this.squareOfSum - this.sumOfSquares;
  }
}