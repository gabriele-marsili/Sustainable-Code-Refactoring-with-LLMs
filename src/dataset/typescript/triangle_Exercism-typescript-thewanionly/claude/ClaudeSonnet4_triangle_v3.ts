export class Triangle {
  sides: number[]
  perimeter: number
  private _isValid: boolean
  private _uniqueSidesCount: number

  constructor(...sides: number[]) {
    this.sides = sides.sort((a, b) => a - b)
    this.perimeter = sides.reduce((acc, curr) => acc + curr, 0)
    this._isValid = this.perimeter > 0 && this.sides[0] + this.sides[1] > this.sides[2]
    this._uniqueSidesCount = this.calculateUniqueSidesCount()
  }

  private calculateUniqueSidesCount(): number {
    const [a, b, c] = this.sides
    if (a === b && b === c) return 1
    if (a === b || b === c || a === c) return 2
    return 3
  }

  private isValid(): boolean {
    return this._isValid
  }

  get isEquilateral(): boolean {
    return this._isValid && this._uniqueSidesCount === 1
  }

  get isIsosceles(): boolean {
    return this._isValid && this._uniqueSidesCount <= 2
  }

  get isScalene(): boolean {
    return this._isValid && this._uniqueSidesCount === 3
  }
}