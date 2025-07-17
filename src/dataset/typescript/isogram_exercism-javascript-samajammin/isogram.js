"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Isogram {
    static isIsogram(input) {
        const normalized = input.toLowerCase().replace(/-|\s/g, '');
        return new Set(normalized).size === normalized.length;
    }
}
exports.default = Isogram;
