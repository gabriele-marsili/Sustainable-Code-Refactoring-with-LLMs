export class Squares {

  private _count: number;
  
  constructor(count: number) {
    this._count = count;
  }

  get sumOfSquares(): number {
    const n = this._count;
    return (n * (n + 1) * (2 * n + 1)) / 6;
  }

  private recSumOfSquares(c: number, sum = 0): number {
    if(c === 0) {
      return sum;
    }

    return this.recSumOfSquares(c - 1, sum + Math.pow(c, 2));
  }

  get squareOfSum(): number {
    const n = this._count;
    const sum = (n * (n + 1)) / 2;
    return sum * sum;
  }

  private recSquareOfSum(c: number, sum = 0): number {
    if(c === 0) {
      return Math.pow(sum, 2);
    }

    return this.recSquareOfSum(c - 1, sum + c);
  }

  get difference(): number {
    const n = this._count;
    const sum = (n * (n + 1)) / 2;
    const sumOfSquares = (n * (n + 1) * (2 * n + 1)) / 6;
    return sum * sum - sumOfSquares;
  }

  private recDifference(n: number, sum = 0, sumSquares = 0): number {
    if (n === 0) {
      return Math.pow(sum, 2) - sumSquares;
    }
  
    return this.recDifference(n - 1, sum + n, sumSquares + Math.pow(n, 2));
  }
}