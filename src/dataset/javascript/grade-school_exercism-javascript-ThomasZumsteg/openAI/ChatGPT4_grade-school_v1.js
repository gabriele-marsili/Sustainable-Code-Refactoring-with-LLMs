class School {
  constructor() {
    this.class = new Map();
  }

  roster() {
    return Object.fromEntries(this.class);
  }

  grade(grade) {
    return this.class.get(grade) || [];
  }

  add(student, grade) {
    if (!this.class.has(grade)) {
      this.class.set(grade, []);
    }
    const students = this.class.get(grade);
    let index = students.findIndex((s) => s > student);
    if (index === -1) index = students.length;
    students.splice(index, 0, student);
  }
}

export default School;