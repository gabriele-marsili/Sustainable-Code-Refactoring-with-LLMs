'use strict';

class School {
  constructor() {
    this.fullroster = {};
  }

  roster() {
    return { ...this.fullroster };
  }

  add(name, grade) {
    if (!this.fullroster[grade]) {
      this.fullroster[grade] = new Set();
    }
    this.fullroster[grade].add(name);
  }

  grade(grade) {
    return this.fullroster[grade] ? Array.from(this.fullroster[grade]).sort() : [];
  }
}

export default School;