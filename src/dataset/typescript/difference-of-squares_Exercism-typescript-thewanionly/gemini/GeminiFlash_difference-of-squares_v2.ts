export class Squares {
  private readonly _count: number;
  private _sumOfSquares?: number;
  private _squareOfSum?: number;
  private _difference?: number;

  constructor(count: number) {
    this._count = count;
  }

  get sumOfSquares(): number {
    if (this._sumOfSquares === undefined) {
      const n = this._count;
      this._sumOfSquares = (n * (n + 1) * (2 * n + 1)) / 6;
    }
    return this._sumOfSquares;
  }

  get squareOfSum(): number {
    if (this._squareOfSum === undefined) {
      const n = this._count;
      const sum = (n * (n + 1)) / 2;
      this._squareOfSum = sum * sum;
    }
    return this._squareOfSum;
  }

  get difference(): number {
    if (this._difference === undefined) {
      this._difference = this.squareOfSum - this.sumOfSquares;
    }
    return this._difference;
  }
}