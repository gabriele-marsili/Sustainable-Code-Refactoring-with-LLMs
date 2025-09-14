export class Triangle {
  sides: number[]
  perimeter: number
  private _isValid: boolean | null = null
  private _uniqueSidesCount: number | null = null

  constructor(...sides: number[]) {
    this.sides = sides.sort((a, b) => a - b)
    this.perimeter = sides.reduce((acc, curr) => acc + curr, 0)
  }

  private isValid(): boolean {
    if (this._isValid === null) {
      this._isValid = this.perimeter > 0 && this.sides[0] + this.sides[1] > this.sides[2]
    }
    return this._isValid
  }

  private getUniqueSidesCount(): number {
    if (this._uniqueSidesCount === null) {
      const [a, b, c] = this.sides
      if (a === b && b === c) {
        this._uniqueSidesCount = 1
      } else if (a === b || b === c || a === c) {
        this._uniqueSidesCount = 2
      } else {
        this._uniqueSidesCount = 3
      }
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