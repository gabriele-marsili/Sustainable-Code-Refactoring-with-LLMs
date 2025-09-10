type TriangleKind = "equilateral" | "isosceles" | "scalene";

export class Triangle {
  private readonly isValid: boolean;

  constructor(private a: number, private b: number, private c: number) {
    this.isValid = this.a > 0 && this.b > 0 && this.c > 0 &&
                   this.a + this.b >= this.c &&
                   this.b + this.c >= this.a &&
                   this.c + this.a >= this.b;
  }

  get isEquilateral(): boolean {
    return this.isValid && this.a === this.b && this.b === this.c;
  }

  get isIsosceles(): boolean {
    return this.isValid && (this.isEquilateral || this.a === this.b || this.b === this.c || this.c === this.a);
  }

  get isScalene(): boolean {
    return this.isValid && this.a !== this.b && this.b !== this.c && this.c !== this.a;
  }
}