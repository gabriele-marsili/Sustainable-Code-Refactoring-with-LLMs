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
        this.students.forEach((students) => students.delete(student));
        if (!this.students.has(grade)) {
            this.students.set(grade, new Set());
        }
        this.students.get(grade).add(student);
    }
    grade(grade) {
        return Array.from(this.students.get(grade) || []).sort();
    }
}
exports.GradeSchool = GradeSchool;
