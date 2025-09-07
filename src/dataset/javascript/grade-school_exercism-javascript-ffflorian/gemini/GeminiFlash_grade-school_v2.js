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
    // Remove the name from any existing grade levels.  Avoids iterating if not needed.
    for (const gradeLevel in this._roster) {
      if (this._roster.hasOwnProperty(gradeLevel)) {
        const gradeList = this._roster[gradeLevel];
        const nameIndex = gradeList.indexOf(name);
        if (nameIndex !== -1) {
          gradeList.splice(nameIndex, 1);
        }
      }
    }

    // Add the name to the specified grade level.
    if (!this._roster[grade]) {
      this._roster[grade] = [];
    }
    this._roster[grade].push(name);
    this._roster[grade].sort();
  }

  /**
   * @param {number} grade
   * @returns {string[]}
   */
  grade(grade) {
    return [...(this._roster[grade] || [])];
  }

  /**
   * @returns {Record<number, string[]> }
   */
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