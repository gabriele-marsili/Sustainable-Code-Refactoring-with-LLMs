class School {
  constructor() {
    this.class = {};
  }

  roster() {
    return this.class;
  }

  grade(grade) {
    return this.class[grade] || [];
  }

  add(student, grade) {
    if (!this.class[grade]) {
      this.class[grade] = [];
    }
    const students = this.class[grade];
    const index = students.findIndex((s) => s > student);
    if (index === -1) {
      students.push(student);
    } else {
      students.splice(index, 0, student);
    }
  }
}

export default School;