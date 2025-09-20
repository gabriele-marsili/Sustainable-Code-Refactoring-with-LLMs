"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Anagram = void 0;
class Anagram {
    constructor(word) {
        this.word = word;
        this.lowerCaseWord = word.toLowerCase();
        this.sortedWord = this.lowerCaseWord.split('').sort().join('');
    }
    matches(...potentials) {
        const output = [];
        for (const potential of potentials) {
            const lowerCasePotential = potential.toLowerCase();
            if (lowerCasePotential === this.lowerCaseWord) {
                continue;
            }
            if (lowerCasePotential.length !== this.word.length) {
                continue;
            }
            const sortedPotential = lowerCasePotential.split('').sort().join('');
            if (sortedPotential === this.sortedWord) {
                output.push(potential);
            }
        }
        return output;
    }
}
exports.Anagram = Anagram;
