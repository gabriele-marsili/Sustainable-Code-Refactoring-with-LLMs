export class GradeSchool {
  data = {};

  roster() {
    return { ...this.data };
  }

  add(student, grade) {
    if (!this.data[grade]) {
      this.data[grade] = new Set();
    }
    if (this.check(student)) {
      this.data[grade].add(student);
      this.data[grade] = new Set([...this.data[grade]].sort());
    }
  }

  grade(g) {
    return this.data[g] ? [...this.data[g]].sort() : [];
  }

  check(student) {
    for (const students of Object.values(this.data)) {
      if (students.has(student)) {
        return false;
      }
    }
    return true;
  }
}