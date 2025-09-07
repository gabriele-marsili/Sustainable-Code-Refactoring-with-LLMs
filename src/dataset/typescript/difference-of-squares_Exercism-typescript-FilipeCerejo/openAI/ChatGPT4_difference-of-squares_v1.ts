export class Squares {

  private _count: number;

  constructor(count: number) {
    this._count = count;
  }

  get sumOfSquares(): number {
    return (this._count * (this._count + 1) * (2 * this._count + 1)) / 6;
  }

  get squareOfSum(): number {
    const sum = (this._count * (this._count + 1)) / 2;
    return sum * sum;
  }

  get difference(): number {
    const sum = (this._count * (this._count + 1)) / 2;
    const sumOfSquares = (this._count * (this._count + 1) * (2 * this._count + 1)) / 6;
    return sum * sum - sumOfSquares;
  }
}