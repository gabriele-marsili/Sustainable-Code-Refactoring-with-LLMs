type TriangleKind = "equilateral" | "isosceles" | "scalene";

export class Triangle {
  private readonly sides: number[];
  private readonly isValid: boolean;

  constructor(private a: number, private b: number, private c: number) {
    this.sides = [a, b, c].sort((x, y) => x - y);
    this.isValid = this.sides[0] > 0 && this.sides[0] + this.sides[1] > this.sides[2];
  }

  get isEquilateral(): boolean {
    return this.isValid && this.a === this.b && this.b === this.c;
  }

  get isIsosceles(): boolean {
    return this.isValid && (this.a === this.b || this.b === this.c || this.c === this.a);
  }

  get isScalene(): boolean {
    return this.isValid && this.a !== this.b && this.b !== this.c && this.c !== this.a;
  }

  kind(triangleKind: TriangleKind): boolean {
    if (!this.isValid) return false;
    switch (triangleKind) {
      case "equilateral":
        return this.isEquilateral;
      case "isosceles":
        return this.isIsosceles;
      case "scalene":
        return this.isScalene;
    }
  }
}