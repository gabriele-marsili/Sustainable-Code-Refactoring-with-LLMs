export class GradeSchool {
  constructor() {
    /**
     * @type {Record<number, string[]>}
     * @private
     * @readonly
     */
    this._roster = {};
  }

  /**
   * @param {string} name
   * @param {number} grade
   */
  add(name, grade) {
    for (const gradeLevel in this._roster) {
      const names = this._roster[gradeLevel];
      const index = names.indexOf(name);
      if (index > -1) {
        names.splice(index, 1);
      }
    }

    if (!this._roster[grade]) {
      this._roster[grade] = [];
    }

    const gradeList = this._roster[grade];
    gradeList.push(name);
    gradeList.sort();
  }

  /**
   * @param {number} grade
   * @returns {string[]}
   */
  grade(grade) {
    const gradeList = this._roster[grade];
    if (!gradeList) {
      return [];
    }
    return [...gradeList];
  }

  /**
   * @returns {Record<number, string[]> }
   */
  roster() {
    const copy = {};
    for (const grade in this._roster) {
      copy[grade] = [...this._roster[grade]];
    }
    return copy;
  }
}