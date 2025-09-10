export class Triangle {
  private readonly a: number;
  private readonly b: number;
  private readonly c: number;
  private readonly perimeter: number;
  private readonly isValidTriangle: boolean;

  constructor(...sides: number[]) {
    const sortedSides = sides.slice().sort((a, b) => a - b);
    this.a = sortedSides[0];
    this.b = sortedSides[1];
    this.c = sortedSides[2];
    this.perimeter = this.a + this.b + this.c;
    this.isValidTriangle = this.perimeter > 0 && this.a + this.b > this.c;
  }

  get isEquilateral(): boolean {
    return this.isValidTriangle && this.a === this.b && this.b === this.c;
  }

  get isIsosceles(): boolean {
    return this.isValidTriangle && (this.a === this.b || this.b === this.c || this.a === this.c);
  }

  get isScalene(): boolean {
    return this.isValidTriangle && this.a !== this.b && this.b !== this.c && this.a !== this.c;
  }
}