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
    for (const gradeIndex in this._roster) {
      const students = this._roster[gradeIndex];
      const nameIndex = students.indexOf(name);
      if (nameIndex !== -1) {
        students.splice(nameIndex, 1);
      }
    }

    if (!this._roster[grade]) {
      this._roster[grade] = [];
    }
    
    const students = this._roster[grade];
    const insertIndex = this._binarySearch(students, name);
    students.splice(insertIndex, 0, name);
  }

  /**
   * @param {number} grade
   * @returns {string[]}
   */
  grade(grade) {
    return this._roster[grade] ? [...this._roster[grade]] : [];
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

  /**
   * @param {string[]} arr
   * @param {string} target
   * @returns {number}
   * @private
   */
  _binarySearch(arr, target) {
    let left = 0;
    let right = arr.length;
    
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] < target) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    
    return left;
  }
}