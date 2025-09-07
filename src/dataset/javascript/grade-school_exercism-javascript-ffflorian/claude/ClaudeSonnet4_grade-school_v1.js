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
    // Remove name from existing grades
    for (const gradeIndex in this._roster) {
      const students = this._roster[gradeIndex];
      const nameIndex = students.indexOf(name);
      if (nameIndex !== -1) {
        students.splice(nameIndex, 1);
        if (students.length === 0) {
          delete this._roster[gradeIndex];
        }
        break; // Name can only exist once, so break after finding it
      }
    }

    // Add to new grade
    if (!this._roster[grade]) {
      this._roster[grade] = [];
    }
    
    // Insert in sorted position to avoid sorting entire array
    const students = this._roster[grade];
    let insertIndex = 0;
    while (insertIndex < students.length && students[insertIndex] < name) {
      insertIndex++;
    }
    students.splice(insertIndex, 0, name);
  }

  /**
   * @param {number} grade
   * @returns {string[]}
   */
  grade(grade) {
    const entry = this._roster[grade];
    return entry ? [...entry] : [];
  }

  /**
   * @returns {Record<number, string[]> }
   */
  roster() {
    const result = {};
    for (const grade in this._roster) {
      result[grade] = [...this._roster[grade]];
    }
    return result;
  }
}