export class Triangle {
  private sides: [number, number, number];
  private perimeter: number;

  constructor(a: number, b: number, c: number) {
    this.sides = [a, b, c].sort((x, y) => x - y) as [number, number, number];
    this.perimeter = a + b + c;
  }

  private isValid(): boolean {
    const [a, b, c] = this.sides;
    return a > 0 && a + b > c;
  }

  get isEquilateral(): boolean {
    const [a, b, c] = this.sides;
    return this.isValid() && a === b && b === c;
  }

  get isIsosceles(): boolean {
    const [a, b, c] = this.sides;
    return this.isValid() && (a === b || b === c || a === c);
  }

  get isScalene(): boolean {
    const [a, b, c] = this.sides;
    return this.isValid() && a !== b && b !== c && a !== c;
  }
}