export class Triangle {
  private readonly a: number;
  private readonly b: number;
  private readonly c: number;
  private readonly perimeter: number;
  private readonly isValidTriangle: boolean;

  constructor(...sides: number[]) {
    if (sides.length !== 3) {
      throw new Error("Triangle must have 3 sides");
    }

    const [a, b, c] = sides.sort((x, y) => x - y);
    this.a = a;
    this.b = b;
    this.c = c;
    this.perimeter = a + b + c;
    this.isValidTriangle = this.perimeter > 0 && a + b > c;
  }

  get isEquilateral(): boolean {
    return this.isValidTriangle && this.a === this.c;
  }

  get isIsosceles(): boolean {
    return this.isValidTriangle && (this.a === this.b || this.b === this.c);
  }

  get isScalene(): boolean {
    return this.isValidTriangle && this.a !== this.b && this.b !== this.c;
  }
}