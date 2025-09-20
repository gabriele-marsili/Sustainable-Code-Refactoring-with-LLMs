"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradeSchool = void 0;
class GradeSchool {
    constructor() {
        this.students = new Map();
    }
    roster() {
        const roster = {};
        this.students.forEach((students, grade) => {
            roster[grade] = Array.from(students).sort();
        });
        return roster;
    }
    add(student, grade) {
        this.students.forEach((students, currentGrade) => {
            if (students.has(student)) {
                students.delete(student);
            }
        });
        if (!this.students.has(grade)) {
            this.students.set(grade, new Set());
        }
        this.students.get(grade).add(student);
    }
    grade(grade) {
        const students = this.students.get(grade);
        return students ? Array.from(students).sort() : [];
    }
}
exports.GradeSchool = GradeSchool;
