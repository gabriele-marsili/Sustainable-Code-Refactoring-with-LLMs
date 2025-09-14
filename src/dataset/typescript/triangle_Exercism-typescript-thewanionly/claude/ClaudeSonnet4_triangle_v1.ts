export class Triangle {
  sides: number[]
  perimeter: number
  private _isValid?: boolean
  private _uniqueSidesCount?: number

  constructor(...sides: number[]) {
    this.sides = sides.sort((a, b) => a - b)
    this.perimeter = sides.reduce((acc, curr) => acc + curr, 0)
  }

  private isValid(): boolean {
    if (this._isValid === undefined) {
      this._isValid = this.perimeter > 0 && this.sides[0] + this.sides[1] > this.sides[2]
    }
    return this._isValid
  }

  private getUniqueSidesCount(): number {
    if (this._uniqueSidesCount === undefined) {
      const [a, b, c] = this.sides
      this._uniqueSidesCount = a === b && b === c ? 1 : a === b || b === c || a === c ? 2 : 3
    }
    return this._uniqueSidesCount
  }

  get isEquilateral(): boolean {
    return this.isValid() && this.getUniqueSidesCount() === 1
  }

  get isIsosceles(): boolean {
    return this.isValid() && this.getUniqueSidesCount() <= 2
  }

  get isScalene(): boolean {
    return this.isValid() && this.getUniqueSidesCount() === 3
  }
}