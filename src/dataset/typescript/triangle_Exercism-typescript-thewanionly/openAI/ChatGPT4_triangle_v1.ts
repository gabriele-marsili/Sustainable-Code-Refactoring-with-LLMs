export class Triangle {
  private sides: number[];
  private perimeter: number;
  private uniqueSidesCount: number;

  constructor(...sides: number[]) {
    this.sides = sides.sort((a, b) => a - b);
    this.perimeter = this.sides[0] + this.sides[1] + this.sides[2];
    this.uniqueSidesCount = new Set(this.sides).size;
  }

  private isValid(): boolean {
    return this.perimeter > 0 && this.sides[0] + this.sides[1] > this.sides[2];
  }

  get isEquilateral(): boolean {
    return this.isValid() && this.uniqueSidesCount === 1;
  }

  get isIsosceles(): boolean {
    return this.isValid() && this.uniqueSidesCount <= 2;
  }

  get isScalene(): boolean {
    return this.isValid() && this.uniqueSidesCount === 3;
  }
}