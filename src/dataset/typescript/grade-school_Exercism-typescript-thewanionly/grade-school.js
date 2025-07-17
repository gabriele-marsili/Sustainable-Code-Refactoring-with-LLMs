"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradeSchool = void 0;
class GradeSchool {
    constructor() {
        this.schoolRoster = {};
    }
    roster() {
        // Return a deep copy of schoolRoster to make schoolRoster immutable from outisde updates
        return JSON.parse(JSON.stringify(this.schoolRoster));
    }
    add(name, grade) {
        this.removeDuplicates(name);
        if (this.schoolRoster[grade]) {
            // Add new name then sort alphabetically
            this.schoolRoster[grade] = [...this.schoolRoster[grade], name].sort((a, b) => a.localeCompare(b));
        }
        else {
            this.schoolRoster[grade] = [name];
        }
    }
    grade(grade) {
        return this.roster()[grade] || [];
    }
    removeDuplicates(name) {
        var _a;
        // Check if the name already exist in other grades. If so, remove the name from the previous grade
        for (let grade in this.schoolRoster) {
            if ((_a = this.schoolRoster[grade]) === null || _a === void 0 ? void 0 : _a.includes(name)) {
                this.schoolRoster[grade] = this.schoolRoster[grade].filter((studentName) => studentName !== name);
                break;
            }
        }
    }
}
exports.GradeSchool = GradeSchool;
