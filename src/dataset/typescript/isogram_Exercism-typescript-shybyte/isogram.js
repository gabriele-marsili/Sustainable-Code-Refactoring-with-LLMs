"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Isogram {
    static isIsogram(text) {
        const letters = [...(text.replace(/[ -]/g, '').toLowerCase())];
        return letters.length === new Set(letters).size;
    }
}
exports.default = Isogram;
