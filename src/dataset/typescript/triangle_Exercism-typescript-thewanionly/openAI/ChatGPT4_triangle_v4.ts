export class Triangle {
  private readonly sides: [number, number, number];
  private readonly perimeter: number;
  private readonly uniqueSideCount: number;

  constructor(...sides: [number, number, number]) {
    this.sides = sides.sort((a, b) => a - b) as [number, number, number];
    this.perimeter = this.sides[0] + this.sides[1] + this.sides[2];
    this.uniqueSideCount = new Set(this.sides).size;
  }

  private isValid(): boolean {
    return this.sides[0] > 0 && this.sides[0] + this.sides[1] > this.sides[2];
  }

  get isEquilateral(): boolean {
    return this.uniqueSideCount === 1 && this.isValid();
  }

  get isIsosceles(): boolean {
    return this.uniqueSideCount <= 2 && this.isValid();
  }

  get isScalene(): boolean {
    return this.uniqueSideCount === 3 && this.isValid();
  }
}