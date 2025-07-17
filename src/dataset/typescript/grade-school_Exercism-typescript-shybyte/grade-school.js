"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GradeSchool {
    constructor() {
        this._rosterDB = new Map();
    }
    studentsInGrade(gradeNumber) {
        // Clone it to prevent modification from evil outside.
        return (this._rosterDB.get(gradeNumber.toString()) || []).slice();
    }
    addStudent(name, gradeNumber) {
        this._rosterDB.set(gradeNumber.toString(), this.studentsInGrade(gradeNumber).concat(name).sort());
    }
    studentRoster() {
        // Clone it to prevent modification from evil outside.
        const deepClone = new Map();
        this._rosterDB.forEach((value, key) => {
            deepClone.set(key, value.slice());
        });
        return deepClone;
    }
}
exports.default = GradeSchool;
