export class Triangle {
  constructor(...sides) {
    sides.sort((a, b) => a - b)
    
    // Validate triangle
    if (sides[0] <= 0 || sides[0] + sides[1] <= sides[2]) {
      this.isEquilateral = false
      this.isIsosceles = false
      this.isScalene = false
      return
    }

    // Determine triangle type
    const [a, b, c] = sides
    if (a === b && b === c) {
      this.isEquilateral = true
      this.isIsosceles = true
      this.isScalene = false
    } else if (a === b || b === c) {
      this.isEquilateral = false
      this.isIsosceles = true
      this.isScalene = false
    } else {
      this.isEquilateral = false
      this.isIsosceles = false
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