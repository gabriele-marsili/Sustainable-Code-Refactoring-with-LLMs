export class GradeSchool {
  constructor() {
    this.data = {};
  }

  roster() {
    const roster_ = {};
    for (const grade in this.data) {
      if (this.data.hasOwnProperty(grade)) {
        roster_[grade] = [...this.data[grade]];
      }
    }
    return roster_;
  }

  add(student, grade) {
    if (!this.data[grade]) {
      this.data[grade] = [];
    }
    if (!this.data[grade].includes(student)) {
      this.data[grade].push(student);
      this.data[grade].sort();
    }
  }

  grade(g) {
    if (!this.data[g]) {
      return [];
    }
    return [...this.data[g]];
  }

  check(student, grade) {
    for (const key in this.data) {
      if (this.data.hasOwnProperty(key)) {
        if (this.data[key].includes(student)) {
          console.log(student, grade, "False");
          return false;
        }
      }
    }
    return true;
  }
}