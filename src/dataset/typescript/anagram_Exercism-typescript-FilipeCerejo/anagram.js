"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Anagram = void 0;
class Anagram {
    constructor(input) {
        this._input = input.toLowerCase();
        this._sortedInput = [...this._input].sort().join('');
    }
    matches(...potentials) {
        const anagrams = [];
        for (const p of potentials) {
            const lowerP = p.toLowerCase();
            if (lowerP === this._input)
                continue;
            if (lowerP.length !== this._input.length)
                continue;
            const sortedP = [...lowerP].sort().join('');
            if (sortedP === this._sortedInput) {
                anagrams.push(p);
            }
        }
        return anagrams;
    }
}
exports.Anagram = Anagram;
