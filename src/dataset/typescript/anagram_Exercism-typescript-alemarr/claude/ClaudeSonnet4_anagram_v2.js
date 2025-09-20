"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Anagram = void 0;
class Anagram {
    constructor(word) {
        this.word = word;
        this.lowerWord = word.toLowerCase();
        this.sortedWord = this.lowerWord.split('').sort().join('');
    }
    matches(...potentials) {
        const output = [];
        for (const potential of potentials) {
            const lowerPotential = potential.toLowerCase();
            if (lowerPotential === this.lowerWord) {
                continue;
            }
            if (potential.length !== this.word.length) {
                continue;
            }
            const sortedPotential = lowerPotential.split('').sort().join('');
            if (sortedPotential === this.sortedWord) {
                output.push(potential);
            }
        }
        return output;
    }
}
exports.Anagram = Anagram;
