'use strict'
class School {
  constructor() {
    this.fullroster = {};
  }

  roster() {
    return this.fullroster;
  }

  add(name, grade) {
    if (!this.fullroster[grade]) {
      this.fullroster[grade] = [];
    }
    
    const gradeArray = this.fullroster[grade];
    const insertIndex = this.binarySearchInsert(gradeArray, name);
    gradeArray.splice(insertIndex, 0, name);
  }

  grade(grade) {
    return this.fullroster[grade] || [];
  }

  binarySearchInsert(arr, item) {
    let left = 0;
    let right = arr.length;
    
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] < item) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    
    return left;
  }
}

export default School;