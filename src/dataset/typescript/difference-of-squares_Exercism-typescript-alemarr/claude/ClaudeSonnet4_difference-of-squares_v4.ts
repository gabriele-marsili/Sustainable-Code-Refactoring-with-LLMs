export class Squares {
  private _sumOfSquares: number | null = null;
  private _squareOfSum: number | null = null;

  constructor(private number: number) {}

  get sumOfSquares(): number {
    if (this._sumOfSquares === null) {
      this._sumOfSquares = (this.number * (this.number + 1) * (2 * this.number + 1)) / 6;
    }
    return this._sumOfSquares;
  }

  get squareOfSum(): number {
    if (this._squareOfSum === null) {
      const sum = (this.number * (this.number + 1)) / 2;
      this._squareOfSum = sum * sum;
    }
    return this._squareOfSum;
  }

  get difference(): number {
    return this.squareOfSum - this.sumOfSquares; 
  }

  private squareOf(number: number): number {
    return number * number;
  }

  private getNumbers(): number[] {
    const result = new Array(this.number);
    for (let i = 0; i < this.number; i++) {
      result[i] = i + 1;
    }
    return result;
  }
}