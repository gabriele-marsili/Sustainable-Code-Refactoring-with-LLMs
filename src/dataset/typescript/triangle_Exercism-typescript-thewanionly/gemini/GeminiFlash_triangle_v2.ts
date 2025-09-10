export class Triangle {
  private readonly side1: number;
  private readonly side2: number;
  private readonly side3: number;
  private readonly isValidTriangle: boolean;

  constructor(...sides: number[]) {
    sides.sort((a, b) => a - b);
    this.side1 = sides[0];
    this.side2 = sides[1];
    this.side3 = sides[2];
    const perimeter = this.side1 + this.side2 + this.side3;
    this.isValidTriangle = perimeter > 0 && this.side1 + this.side2 > this.side3;
  }

  get isEquilateral(): boolean {
    return this.isValidTriangle && this.side1 === this.side2 && this.side2 === this.side3;
  }

  get isIsosceles(): boolean {
    return this.isValidTriangle && (this.side1 === this.side2 || this.side1 === this.side3 || this.side2 === this.side3);
  }

  get isScalene(): boolean {
    return this.isValidTriangle && this.side1 !== this.side2 && this.side1 !== this.side3 && this.side2 !== this.side3;
  }
}