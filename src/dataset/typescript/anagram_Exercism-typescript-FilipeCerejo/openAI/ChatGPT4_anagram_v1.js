"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Anagram = void 0;
class Anagram {
    constructor(input) {
        this._input = input.toLowerCase();
        this._sortedInput = this.sortString(this._input);
    }
    matches(...potentials) {
        return potentials.filter((p) => {
            const lowerP = p.toLowerCase();
            return lowerP !== this._input && this.sortString(lowerP) === this._sortedInput;
        });
    }
    sortString(str) {
        return str.split('').sort().join('');
    }
}
exports.Anagram = Anagram;
