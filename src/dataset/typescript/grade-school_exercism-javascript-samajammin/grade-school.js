"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GradeSchool {
    constructor() {
        this._roster = new Map();
    }
    studentRoster() {
        let clone = new Map();
        this._roster.forEach((value, key) => {
            clone.set(key, [...value]);
        });
        return clone;
    }
    studentsInGrade(grade) {
        const students = this._roster.get(grade.toString()) || [];
        return students.slice();
    }
    addStudent(name, grade) {
        const gradeString = grade.toString();
        const gradeRoster = this._roster.get(gradeString) || [];
        gradeRoster.push(name);
        gradeRoster.sort();
        this._roster.set(gradeString, gradeRoster);
    }
}
exports.default = GradeSchool;
