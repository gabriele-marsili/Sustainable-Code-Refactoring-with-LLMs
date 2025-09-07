export class GradeSchool {
  constructor() {
    this._roster = {};
  }

  add(name, grade) {
    for (const gradeLevel in this._roster) {
      const index = this._roster[gradeLevel].indexOf(name);
      if (index !== -1) {
        this._roster[gradeLevel].splice(index, 1);
      }
    }

    if (!this._roster[grade]) {
      this._roster[grade] = [];
    }
    this._roster[grade].push(name);
    this._roster[grade].sort();
  }

  grade(grade) {
    const entry = this._roster[grade];
    if (!entry) {
      return [];
    }
    return [...entry];
  }

  roster() {
    const copy = {};
    for (const grade in this._roster) {
      if (this._roster.hasOwnProperty(grade)) {
        copy[grade] = [...this._roster[grade]];
      }
    }
    return copy;
  }
}