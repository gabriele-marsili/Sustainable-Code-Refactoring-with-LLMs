/* Classifies triangles */
class Triangle {
  constructor(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  kind() {
    // Sides from smallest to largest
    const [a, b, c] = [this.a, this.b, this.c].sort((x, y) => x - y);

    // Validation
    if (a <= 0 || a + b <= c) throw new Error("Invalid triangle");

    // Classification
    if (a === c) return "equilateral";
    if (a === b || b === c) return "isosceles";
    return "scalene";
  }
}

export default Triangle;