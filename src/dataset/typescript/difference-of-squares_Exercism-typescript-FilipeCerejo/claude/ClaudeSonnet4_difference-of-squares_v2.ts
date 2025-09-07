export class Squares {

  private _count: number;
  
  constructor(count: number) {
    this._count = count;
  }

  get sumOfSquares(): number {
    const n = this._count;
    return (n * (n + 1) * (2 * n + 1)) / 6;
  }

  get squareOfSum(): number {
    const n = this._count;
    const sum = (n * (n + 1)) / 2;
    return sum * sum;
  }

  get difference(): number {
    const n = this._count;
    const sum = (n * (n + 1)) / 2;
    const sumOfSquares = (n * (n + 1) * (2 * n + 1)) / 6;
    return sum * sum - sumOfSquares;
  }
}