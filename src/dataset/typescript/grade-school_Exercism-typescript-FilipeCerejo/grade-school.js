"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradeSchool = void 0;
class GradeSchool {
    constructor() {
        this._roster = {};
    }
    roster() {
        let newO = {};
        Object.keys(this._roster).forEach((grade) => {
            newO[Number(grade)] = [...this._roster[Number(grade)]];
        });
        return newO;
    }
    add(name, grade) {
        this.removeIfNecessary(name);
        if (this._roster[grade]) {
            this._roster[grade].push(name);
            this._roster[grade].sort();
        }
        else {
            this._roster[grade] = [name];
        }
    }
    removeIfNecessary(newName) {
        Object.keys(this._roster).forEach((grade) => {
            this._roster[Number(grade)] = this._roster[Number(grade)].filter(name => name !== newName);
        });
    }
    grade(g) {
        let ro = this._roster[g] ? this._roster[g].slice() : [];
        return ro;
    }
}
exports.GradeSchool = GradeSchool;
