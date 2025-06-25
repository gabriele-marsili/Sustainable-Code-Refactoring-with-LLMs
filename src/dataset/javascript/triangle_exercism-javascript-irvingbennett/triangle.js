export class Triangle {
  sides_ = []
  isEquilateral = false
  isIsosceles = false
  isScalene = false

  constructor(...sides) {
    sides.sort()
    // console.log(sides)
    for (let s in sides) {
      this.sides_.push(sides[s])
    }
    if (sides[0] <= 0) { // Not a triangle
      return
    }
    if (sides[0] + sides[1] < sides[2]) { // Not a triangle
      return
    }
    if (this.sides_[0] == this.sides_[1] && this.sides_[2] == this.sides_[1]) {
      this.isEquilateral = true
      this.isIsosceles = true
      return
    } 
    if (this.sides_[0] == this.sides_[1] ||
        this.sides_[2] == this.sides_[1]) {
          this.isIsosceles = true
          return
    }
    this.isScalene = true
  }

  get isEquilateral() {
    return this.isEquilateral
  }

  get isIsosceles() {
    return this.isIsosceles
  }

  get isScalene() {
    this.isScalene
  }
}