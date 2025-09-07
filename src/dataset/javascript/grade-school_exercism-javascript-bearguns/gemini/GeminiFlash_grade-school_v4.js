'use strict'
class School {
  constructor() {
    this.fullroster = {};
  }

  roster() {
    return Object.assign({}, this.fullroster);
  }

  add(name, grade) {
    if (!this.fullroster[grade]) {
      this.fullroster[grade] = [];
    }
    this.fullroster[grade].push(name);
    this.fullroster[grade].sort();
  }

  grade(grade) {
    const roster = this.fullroster[grade];
    if (!roster) {
      return [];
    }
    return [...roster].sort();
  }
}

export default School;