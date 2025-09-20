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
        const inputLength = this._input.length;
        for (const potential of potentials) {
            const lowerPotential = potential.toLowerCase();
            if (lowerPotential === this._input || lowerPotential.length !== inputLength) {
                continue;
            }
            const sortedPotential = [...lowerPotential].sort().join('');
            if (sortedPotential === this._sortedInput) {
                anagrams.push(potential);
            }
        }
        return anagrams;
    }
}
exports.Anagram = Anagram;
