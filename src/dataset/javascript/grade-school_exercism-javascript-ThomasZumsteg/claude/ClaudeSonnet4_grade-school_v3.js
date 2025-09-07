class School {
  constructor() {
    this.class = Object.create(null);
  }

  roster() {
    const result = Object.create(null);
    for (const grade in this.class) {
      result[grade] = [...this.class[grade]];
    }
    return result;
  }

  grade(grade) {
    return this.class[grade] ? [...this.class[grade]] : [];
  }

  add(student, grade) {
    if (this.class[grade]) {
      const students = this.class[grade];
      const insertIndex = this._findInsertIndex(students, student);
      students.splice(insertIndex, 0, student);
    } else {
      this.class[grade] = [student];
    }
  }

  _findInsertIndex(arr, student) {
    let left = 0;
    let right = arr.length;
    
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] < student) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    
    return left;
  }
}

export default School;