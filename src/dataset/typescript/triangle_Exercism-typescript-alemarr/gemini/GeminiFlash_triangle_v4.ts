type TriangleKind = "equilateral" | "isosceles" | "scalene";

export class Triangle {
  private _kind: TriangleKind;
  private isValid: boolean;

  constructor(private a: number, private b: number, private c: number) {
    this.isValid = !this.validateInequalityViolation() && !this.validateSidesAreNotZero();
    this._kind = this.isValid ? this.getTriangleKind() : "scalene";
  }

  get isEquilateral(): boolean {
    return this._kind === "equilateral";
  }

  get isIsosceles(): boolean {
    return this._kind === "isosceles" || this._kind === "equilateral";
  }

  get isScalene(): boolean {
    return this._kind === 'scalene';
  }

  kind(triangleKind: TriangleKind): boolean {
    return this.isValid && this._kind === triangleKind;
  }

  private getTriangleKind(): TriangleKind {
    if (this.a === this.b && this.b === this.c) {
      return "equilateral";
    }
    if (this.a !== this.b && this.a !== this.c && this.b !== this.c) {
      return "scalene";
    }
    return "isosceles";
  }

  private validateInequalityViolation(): boolean {
    return this.a + this.b <= this.c || this.b + this.c <= this.a || this.c + this.a <= this.b;
  }

  private validateSidesAreNotZero(): boolean {
    return this.a <= 0 || this.b <= 0 || this.c <= 0;
  }
}