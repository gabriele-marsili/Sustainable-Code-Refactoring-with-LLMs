export class Triangle {
  constructor(...sides) {
    sides.sort((a, b) => a - b);
    
    this.isEquilateral = false;
    this.isIsosceles = false;
    this.isScalene = false;
    
    if (sides[0] <= 0 || sides[0] + sides[1] <= sides[2]) {
      return;
    }
    
    const [a, b, c] = sides;
    const equalAB = a === b;
    const equalBC = b === c;
    
    if (equalAB && equalBC) {
      this.isEquilateral = true;
      this.isIsosceles = true;
    } else if (equalAB || equalBC) {
      this.isIsosceles = true;
    } else {
      this.isScalene = true;
    }
  }

  get isEquilateral() {
    return this.isEquilateral;
  }

  get isIsosceles() {
    return this.isIsosceles;
  }

  get isScalene() {
    return this.isScalene;
  }
}