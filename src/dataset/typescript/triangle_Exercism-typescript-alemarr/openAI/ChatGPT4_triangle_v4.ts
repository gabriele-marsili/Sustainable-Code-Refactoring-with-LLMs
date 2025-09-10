type TriangleKind = "equilateral" | "isosceles" | "scalene";

export class Triangle {
  constructor(private a: number, private b: number, private c: number) {}

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
    return (
      this.a > 0 &&
      this.b > 0 &&
      this.c > 0 &&
      this.a + this.b > this.c &&
      this.b + this.c > this.a &&
      this.c + this.a > this.b
    );
  }
}