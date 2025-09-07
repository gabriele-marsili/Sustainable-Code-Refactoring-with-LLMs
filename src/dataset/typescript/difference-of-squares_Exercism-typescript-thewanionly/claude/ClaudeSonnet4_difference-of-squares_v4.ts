export class Squares {
  count: number
  private _sumOfSquares?: number
  private _squareOfSum?: number
  private _difference?: number

  constructor(count: number) {
    this.count = count
  }

  get sumOfSquares(): number {
    if (this._sumOfSquares === undefined) {
      this._sumOfSquares = (this.count * (this.count + 1) * (2 * this.count + 1)) / 6
    }
    return this._sumOfSquares
  }

  get squareOfSum(): number {
    if (this._squareOfSum === undefined) {
      const sum = (this.count * (this.count + 1)) >> 1
      this._squareOfSum = sum * sum
    }
    return this._squareOfSum
  }

  get difference(): number {
    if (this._difference === undefined) {
      this._difference = this.squareOfSum - this.sumOfSquares
    }
    return this._difference
  }
}