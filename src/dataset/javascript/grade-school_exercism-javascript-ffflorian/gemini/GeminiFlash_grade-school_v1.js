export class GradeSchool {
  constructor() {
    this._roster = {};
  }

  add(name, grade) {
    for (const gradeLevel in this._roster) {
      if (this._roster[gradeLevel].includes(name)) {
        this._roster[gradeLevel] = this._roster[gradeLevel].filter(student => student !== name);
      }
    }

    if (!this._roster[grade]) {
      this._roster[grade] = [];
    }
    this._roster[grade].push(name);
    this._roster[grade].sort();
  }

  grade(grade) {
    return [...(this._roster[grade] || [])].sort();
  }

  roster() {
    const copy = {};
    for (const grade in this._roster) {
      copy[grade] = [...this._roster[grade]];
    }
    return copy;
  }
}