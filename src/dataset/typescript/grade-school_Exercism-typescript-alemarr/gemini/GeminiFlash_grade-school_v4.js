"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradeSchool = void 0;
class GradeSchool {
    constructor() {
        this.students = new Map();
    }
    roster() {
        const roster = {};
        for (const [grade, students] of this.students) {
            roster[grade] = [...students].sort();
        }
        return roster;
    }
    add(student, grade) {
        let students = this.students.get(grade);
        if (students) {
            students.push(student);
        }
        else {
            students = [student];
            this.students.set(grade, students);
        }
    }
    grade(grade) {
        const students = this.students.get(grade);
        if (students) {
            return [...students].sort();
        }
        return [];
    }
}
exports.GradeSchool = GradeSchool;
