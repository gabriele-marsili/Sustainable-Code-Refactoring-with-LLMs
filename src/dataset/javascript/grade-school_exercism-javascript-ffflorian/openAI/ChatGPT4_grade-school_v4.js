export class GradeSchool {
  constructor() {
    /** @type {Map<number, Set<string>>} */
    this._roster = new Map();
  }

  /**
   * @param {string} name
   * @param {number} grade
   */
  add(name, grade) {
    for (const [gradeKey, names] of this._roster) {
      if (names.delete(name) && names.size === 0) {
        this._roster.delete(gradeKey);
      }
    }

    if (!this._roster.has(grade)) {
      this._roster.set(grade, new Set());
    }
    this._roster.get(grade).add(name);
  }

  /**
   * @param {number} grade
   * @returns {string[]}
   */
  grade(grade) {
    return this._roster.has(grade)
      ? Array.from(this._roster.get(grade)).sort()
      : [];
  }

  /**
   * @returns {Record<number, string[]> }
   */
  roster() {
    const result = {};
    for (const [grade, names] of this._roster) {
      result[grade] = Array.from(names).sort();
    }
    return result;
  }
}