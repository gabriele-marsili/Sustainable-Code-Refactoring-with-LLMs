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
        for (const potential of potentials) {
            const lowerPotential = potential.toLowerCase();
            if (lowerPotential === this._input)
                continue;
            if (lowerPotential.length !== this._input.length)
                continue;
            const sortedPotential = [...lowerPotential].sort().join('');
            if (sortedPotential === this._sortedInput) {
                anagrams.push(potential);
            }
        }
        return anagrams;
    }
}
exports.Anagram = Anagram;
