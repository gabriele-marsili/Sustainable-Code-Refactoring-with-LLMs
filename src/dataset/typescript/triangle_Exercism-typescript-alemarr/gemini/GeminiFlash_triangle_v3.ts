type TriangleKind = "equilateral" | "isosceles" | "scalene";

export class Triangle {
  private _kind: TriangleKind | null = null;
  private isValid: boolean | null = null;

  constructor(private a: number, private b: number, private c: number) {
    if (a <= 0 || b <= 0 || c <= 0) {
      this.isValid = false;
      return;
    }

    if (a + b <= c || a + c <= b || b + c <= a) {
      this.isValid = false;
      return;
    }

    this.isValid = true;

    if (a === b && b === c) {
      this._kind = "equilateral";
    } else if (a !== b && a !== c && b !== c) {
      this._kind = "scalene";
    } else {
      this._kind = "isosceles";
    }
  }

  get isEquilateral(): boolean {
    return this._kind === "equilateral" && this.isValid === true;
  }

  get isIsosceles(): boolean {
    return (this._kind === "isosceles" || this._kind === "equilateral") && this.isValid === true;
  }

  get isScalene(): boolean {
    return this._kind === "scalene" && this.isValid === true;
  }

  kind(triangleKind: TriangleKind): boolean {
    if (this.isValid === false) return false;

    if (triangleKind === "equilateral") {
      return this._kind === "equilateral";
    } else if (triangleKind === "isosceles") {
      return this._kind === "isosceles";
    } else {
      return this._kind === "scalene";
    }
  }
}