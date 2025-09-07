export class GradeSchool {
  data = {}
  #studentSet = new Set()

  roster() {
    const roster_ = {}
    for (const grade in this.data) {
      roster_[grade] = [...this.data[grade]]
    }
    return roster_
  }

  add(student, grade) {
    if (this.#studentSet.has(student)) {
      return
    }
    
    if (!this.data[grade]) {
      this.data[grade] = []
    }
    
    this.data[grade].push(student)
    this.data[grade].sort()
    this.#studentSet.add(student)
  }

  grade(g) {
    return this.data[g] ? [...this.data[g]] : []
  }

  check(student, grade) {
    const exists = this.#studentSet.has(student)
    if (exists) {
      console.log(student, grade, "False")
    }
    return !exists
  }
}