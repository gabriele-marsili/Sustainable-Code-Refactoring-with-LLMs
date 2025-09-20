"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Anagram = void 0;
class Anagram {
    constructor(input) {
        this._input = input.toLowerCase();
        this._sortedInput = Anagram.sortString(this._input);
    }
    matches(...potentials) {
        return potentials.filter((p) => {
            const lowerP = p.toLowerCase();
            return lowerP !== this._input && Anagram.sortString(lowerP) === this._sortedInput;
        });
    }
    static sortString(str) {
        return str.split('').sort().join('');
    }
}
exports.Anagram = Anagram;
