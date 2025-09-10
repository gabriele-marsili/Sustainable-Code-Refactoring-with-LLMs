type TriangleKind = "equilateral" | "isosceles" | "scalene";

export class Triangle {
  private readonly sides: number[];

  constructor(private a: number, private b: number, private c: number) {
    this.sides = [a, b, c].sort((x, y) => x - y);
  }

  get isEquilateral(): boolean {
    return this.isValid() && this.a === this.b && this.b === this.c;
  }

  get isIsosceles(): boolean {
    return this.isValid() && (this.a === this.b || this.b === this.c || this.a === this.c);
  }

  get isScalene(): boolean {
    return this.isValid() && this.a !== this.b && this.b !== this.c && this.a !== this.c;
  }

  private isValid(): boolean {
    return this.sides[0] > 0 && this.sides[0] + this.sides[1] > this.sides[2];
  }
}