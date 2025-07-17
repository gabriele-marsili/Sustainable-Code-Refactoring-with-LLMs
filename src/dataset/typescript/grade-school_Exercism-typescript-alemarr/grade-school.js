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
            roster[grade] = [...students.sort()];
        });
        return roster;
    }
    add(student, grade) {
        [...this.students].find(([currentGrade, students]) => {
            const remainingStudents = students.filter((s) => s !== student);
            this.students.set(currentGrade, remainingStudents);
        });
        const students = this.students.get(grade) || [];
        students.push(student);
        this.students.set(grade, students);
    }
    grade(grade) {
        const students = this.students.get(grade) || [];
        return [...students.slice().sort()];
    }
}
exports.GradeSchool = GradeSchool;
