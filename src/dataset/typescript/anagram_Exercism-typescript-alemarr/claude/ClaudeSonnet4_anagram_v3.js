"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Anagram = void 0;
class Anagram {
    constructor(word) {
        this.word = word;
        this.normalizedWord = word.toLowerCase();
        this.sortedWord = this.normalizedWord.split('').sort().join('');
    }
    matches(...potentials) {
        const result = [];
        for (const potential of potentials) {
            const normalizedPotential = potential.toLowerCase();
            if (normalizedPotential === this.normalizedWord) {
                continue;
            }
            if (normalizedPotential.length !== this.normalizedWord.length) {
                continue;
            }
            const sortedPotential = normalizedPotential.split('').sort().join('');
            if (sortedPotential === this.sortedWord) {
                result.push(potential);
            }
        }
        return result;
    }
}
exports.Anagram = Anagram;
