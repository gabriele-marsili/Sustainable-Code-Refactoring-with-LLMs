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
        for (const [currentGrade, students] of this.students) {
            if (currentGrade !== grade)
                continue;
            const index = students.indexOf(student);
            if (index > -1) {
                students.splice(index, 1);
                if (students.length === 0) {
                    this.students.delete(currentGrade);
                }
            }
        }
        const students = this.students.get(grade) || [];
        students.push(student);
        students.sort();
        this.students.set(grade, students);
    }
    grade(grade) {
        const students = this.students.get(grade);
        return students ? [...students].sort() : [];
    }
}
exports.GradeSchool = GradeSchool;
