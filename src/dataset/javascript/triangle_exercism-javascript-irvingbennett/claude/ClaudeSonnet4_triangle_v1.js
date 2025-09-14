export class Triangle {
  constructor(...sides) {
    sides.sort((a, b) => a - b)
    
    this.isEquilateral = false
    this.isIsosceles = false
    this.isScalene = false

    if (sides[0] <= 0 || sides[0] + sides[1] <= sides[2]) {
      return
    }

    const [a, b, c] = sides
    
    if (a === b && b === c) {
      this.isEquilateral = true
      this.isIsosceles = true
    } else if (a === b || b === c) {
      this.isIsosceles = true
    } else {
      this.isScalene = true
    }
  }

  get isEquilateral() {
    return this.isEquilateral
  }

  get isIsosceles() {
    return this.isIsosceles
  }

  get isScalene() {
    return this.isScalene
  }
}