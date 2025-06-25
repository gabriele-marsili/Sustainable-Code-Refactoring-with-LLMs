export class GradeSchool {
  data = {}
  roster() {
    // let roster_ = Object.assign({}, this.data);
    const roster_ = JSON.parse(JSON.stringify(this.data));
    return roster_
  }

  add(student, grade) {
    if (!this.data[grade]) {
      this.data[grade] = []
    }
    if (this.check(student, grade)) {
      this.data[grade].push(student)
      this.data[grade].sort()
    }
  }

  grade(g) {
    if (!this.data[g]) {
      this.data[g] = []
    }
    this.data[g].sort()
    const roster_ = JSON.parse(JSON.stringify(this.data));
    return roster_[g]
  }

  check(student, grade) {
    // console.log(student, grade)
    for (let key in this.data) {
      // console.log(key, this.data[key])
      for (let n in this.data[key]) {
        // console.log(student, this.data[key][n], n)
        if (student == this.data[key][n]) {
          console.log(student, grade, "False")
          return false
        }
      }      
    }
    return true
  }
}
