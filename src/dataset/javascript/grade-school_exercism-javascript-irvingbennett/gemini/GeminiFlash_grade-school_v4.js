export class GradeSchool {
  data = {};

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
    if (this.check(student, grade)) {
      this.data[grade].push(student);
      this.data[grade].sort();
    }
  }

  grade(grade) {
    if (!this.data[grade]) {
      return [];
    }
    return [...this.data[grade]].sort();
  }

  check(student, grade) {
    for (const gradeLevel in this.data) {
      if (this.data.hasOwnProperty(gradeLevel)) {
        if (this.data[gradeLevel].includes(student)) {
          return false;
        }
      }
    }
    return true;
  }
}