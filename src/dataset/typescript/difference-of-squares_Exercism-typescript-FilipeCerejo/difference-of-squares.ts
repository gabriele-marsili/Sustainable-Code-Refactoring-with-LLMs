export class Squares {

  private _count: number;
  
  constructor(count: number) {
    this._count = count;
  }

  get sumOfSquares(): number {
    return this.recSumOfSquares(this._count);
  }

  private recSumOfSquares(c: number, sum = 0): number {
    if(c === 0) {
      return sum;
    }

    return this.recSumOfSquares(c - 1, sum + Math.pow(c, 2));
  }

  get squareOfSum(): unknown {
    return this.recSquareOfSum(this._count);
  }

  private recSquareOfSum(c: number, sum = 0): number {
    if(c === 0) {
      return Math.pow(sum, 2);
    }

    return this.recSquareOfSum(c - 1, sum + c);
  }

  get difference(): number {
    return this.recDifference(this._count);
  }

  private recDifference(n: number, sum = 0, sumSquares = 0): number {
    if (n === 0) {
      return Math.pow(sum, 2) - sumSquares;
    }
  
    return this.recDifference(n - 1, sum + n, sumSquares + Math.pow(n, 2));
  }
}
