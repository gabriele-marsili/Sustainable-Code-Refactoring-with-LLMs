"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradeSchool = void 0;
class GradeSchool {
    constructor() {
        this.students = new Map();
    }
    roster() {
        const roster = {};
        for (const [grade, studentSet] of this.students) {
            roster[grade] = Array.from(studentSet).sort();
        }
        return roster;
    }
    add(student, grade) {
        // Remove student from all other grades
        for (const [currentGrade, studentSet] of this.students) {
            if (currentGrade !== grade) {
                studentSet.delete(student);
            }
        }
        // Add student to the specified grade
        if (!this.students.has(grade)) {
            this.students.set(grade, new Set());
        }
        this.students.get(grade).add(student);
    }
    grade(grade) {
        const studentSet = this.students.get(grade);
        return studentSet ? Array.from(studentSet).sort() : [];
    }
}
exports.GradeSchool = GradeSchool;
