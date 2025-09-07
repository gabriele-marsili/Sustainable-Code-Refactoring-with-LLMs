export class GradeSchool {
  constructor() {
    /**
     * @type {Map<number, string[]>}
     * @private
     * @readonly
     */
    this._roster = new Map();
    
    /**
     * @type {Map<string, number>}
     * @private
     * @readonly
     */
    this._nameToGrade = new Map();
  }

  /**
   * @param {string} name
   * @param {number} grade
   */
  add(name, grade) {
    // Remove from previous grade if exists
    const previousGrade = this._nameToGrade.get(name);
    if (previousGrade !== undefined) {
      const previousEntries = this._roster.get(previousGrade);
      if (previousEntries) {
        const nameIndex = previousEntries.indexOf(name);
        if (nameIndex !== -1) {
          previousEntries.splice(nameIndex, 1);
        }
      }
    }

    // Add to new grade
    let entries = this._roster.get(grade);
    if (!entries) {
      entries = [];
      this._roster.set(grade, entries);
    }
    
    // Insert in sorted position
    const insertIndex = this._findInsertIndex(entries, name);
    entries.splice(insertIndex, 0, name);
    
    this._nameToGrade.set(name, grade);
  }

  /**
   * @param {string[]} arr
   * @param {string} name
   * @returns {number}
   * @private
   */
  _findInsertIndex(arr, name) {
    let left = 0;
    let right = arr.length;
    
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] < name) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    
    return left;
  }

  /**
   * @param {number} grade
   * @returns {string[]}
   */
  grade(grade) {
    const entry = this._roster.get(grade);
    return entry ? [...entry] : [];
  }

  /**
   * @returns {Record<number, string[]> }
   */
  roster() {
    const result = {};
    for (const [grade, names] of this._roster) {
      result[grade] = [...names];
    }
    return result;
  }
}