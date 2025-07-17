"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GradeSchool {
    constructor() {
        this.roster = new Map();
    }
    studentRoster() {
        const copy = new Map();
        this.roster.forEach((value, key) => copy.set(key, [...value]));
        return copy;
    }
    addStudent(name, grade) {
        const gradeString = grade.toString();
        this.removeStudent(name);
        if (this.roster.has(gradeString)) {
            const students = this.roster.get(gradeString);
            students === null || students === void 0 ? void 0 : students.push(name);
            students === null || students === void 0 ? void 0 : students.sort();
        }
        else {
            this.roster.set(gradeString, [name]);
        }
    }
    studentsInGrade(grade) {
        const result = this.roster.get(grade.toString());
        return result ? [...result] : [];
    }
    removeStudent(name) {
        this.roster.forEach((value, key) => {
            var _a;
            if (value.includes(name)) {
                const students = (_a = this.roster.get(key)) === null || _a === void 0 ? void 0 : _a.filter(st => st != name);
                if (students) {
                    this.roster.set(key, students);
                }
            }
        });
    }
}
exports.default = GradeSchool;
