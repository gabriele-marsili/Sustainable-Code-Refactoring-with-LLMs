'use strict';

class School {
  constructor() {
    this.fullroster = new Map();
  }

  roster() {
    const result = {};
    for (const [grade, students] of this.fullroster.entries()) {
      result[grade] = [...students];
    }
    return result;
  }

  add(name, grade) {
    if (!this.fullroster.has(grade)) {
      this.fullroster.set(grade, new Set());
    }
    this.fullroster.get(grade).add(name);
  }

  grade(grade) {
    return this.fullroster.has(grade) ? [...this.fullroster.get(grade)].sort() : [];
  }
}

export default School;