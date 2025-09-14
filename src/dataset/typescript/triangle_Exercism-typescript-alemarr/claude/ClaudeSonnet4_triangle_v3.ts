type TriangleKind = "equilateral" | "isosceles" | "scalene";

export class Triangle {
  private _kind: TriangleKind | null = null;
  private _isValid: boolean | null = null;

  constructor(private a: number, private b: number, private c: number) {}

  get isEquilateral(): boolean {
    return this.getKind() === "equilateral";
  }

  get isIsosceles(): boolean {
    const triangleKind = this.getKind();
    return triangleKind === "isosceles" || triangleKind === "equilateral";
  }

  get isScalene(): boolean {
    return this.getKind() === "scalene";
  }

  kind(triangleKind: TriangleKind): boolean {
    return this.isValidTriangle() && this.getKind() === triangleKind;
  }

  private getKind(): TriangleKind {
    if (!this.isValidTriangle()) return "scalene";
    
    if (this._kind === null) {
      if (this.a === this.b && this.b === this.c) {
        this._kind = "equilateral";
      } else if (this.a === this.b || this.a === this.c || this.b === this.c) {
        this._kind = "isosceles";
      } else {
        this._kind = "scalene";
      }
    }
    return this._kind;
  }

  private isValidTriangle(): boolean {
    if (this._isValid === null) {
      this._isValid = this.a > 0 && this.b > 0 && this.c > 0 &&
        this.a + this.b > this.c &&
        this.b + this.c > this.a &&
        this.c + this.a > this.b;
    }
    return this._isValid;
  }

  private allSidesAreEqual(): boolean {
    return this.a === this.b && this.b === this.c;
  }

  private allSidesAreDifferent(): boolean {
    return this.a !== this.b && this.a !== this.c && this.b !== this.c;
  }

  private getMatchingSides(): TriangleKind {
    if (this.allSidesAreEqual()) return "equilateral";
    if (this.allSidesAreDifferent()) return "scalene";
    return "isosceles";
  }

  private validateInequalityViolation(): boolean {
    return this.a + this.b <= this.c ||
      this.b + this.c <= this.a ||
      this.c + this.a <= this.b;
  }

  private validateSidesAreNotZero(): boolean {
    return this.a <= 0 || this.b <= 0 || this.c <= 0;
  }
}