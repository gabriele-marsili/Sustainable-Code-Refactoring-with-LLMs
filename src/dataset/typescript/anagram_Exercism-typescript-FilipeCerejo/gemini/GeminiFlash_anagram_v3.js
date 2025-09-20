"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Anagram = void 0;
class Anagram {
    constructor(input) {
        this._inputLower = input.toLowerCase();
        this._sortedInput = [...this._inputLower].sort().join('');
    }
    matches(...potentials) {
        const anagrams = [];
        for (const potential of potentials) {
            const potentialLower = potential.toLowerCase();
            if (potentialLower === this._inputLower) {
                continue;
            }
            if (potentialLower.length !== this._inputLower.length) {
                continue;
            }
            const sortedPotential = [...potentialLower].sort().join('');
            if (sortedPotential === this._sortedInput) {
                anagrams.push(potential);
            }
        }
        return anagrams;
    }
}
exports.Anagram = Anagram;
