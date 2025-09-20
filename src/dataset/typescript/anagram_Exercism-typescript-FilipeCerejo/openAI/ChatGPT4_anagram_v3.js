"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Anagram = void 0;
class Anagram {
    constructor(input) {
        this._input = input.toLowerCase();
        this._sortedInput = this.sortString(this._input);
    }
    matches(...potentials) {
        return potentials.filter((p) => this.isAnagram(p.toLowerCase()) && p.toLowerCase() !== this._input);
    }
    sortString(str) {
        return str.split('').sort().join('');
    }
    isAnagram(potential) {
        return this.sortString(potential) === this._sortedInput;
    }
}
exports.Anagram = Anagram;
