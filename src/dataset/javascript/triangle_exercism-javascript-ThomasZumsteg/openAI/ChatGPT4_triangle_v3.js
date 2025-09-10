class Triangle {
  constructor(a, b, c) {
    this.sides = [a, b, c];
  }

  kind() {
    const [a, b, c] = this.sides.sort((x, y) => x - y);

    if (a <= 0 || a + b <= c) throw new Error("Invalid triangle");

    return a === c ? "equilateral" : a === b || b === c ? "isosceles" : "scalene";
  }
}

export default Triangle;