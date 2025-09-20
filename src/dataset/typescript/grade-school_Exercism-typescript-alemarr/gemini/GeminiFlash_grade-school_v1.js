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
            if (currentGrade !== grade) {
                const index = students.indexOf(student);
                if (index > -1) {
                    students.splice(index, 1);
                    if (students.length === 0) {
                        this.students.delete(currentGrade);
                    }
                    else {
                        this.students.set(currentGrade, students);
                    }
                }
            }
        }
        const students = this.students.get(grade);
        if (students) {
            students.push(student);
        }
        else {
            this.students.set(grade, [student]);
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
