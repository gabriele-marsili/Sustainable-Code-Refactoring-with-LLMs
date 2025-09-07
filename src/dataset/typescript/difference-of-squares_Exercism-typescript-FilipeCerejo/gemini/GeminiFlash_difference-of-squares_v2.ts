export class Squares {

  private _count: number;

  constructor(count: number) {
    this._count = count;
  }

  get sumOfSquares(): number {
    let sum = 0;
    for (let i = 1; i <= this._count; i++) {
      sum += i * i;
    }
    return sum;
  }

  get squareOfSum(): number {
    let sum = 0;
    for (let i = 1; i <= this._count; i++) {
      sum += i;
    }
    return sum * sum;
  }

  get difference(): number {
    let sum = 0;
    let sumSquares = 0;
    for (let i = 1; i <= this._count; i++) {
      sum += i;
      sumSquares += i * i;
    }
    return sum * sum - sumSquares;
  }
}