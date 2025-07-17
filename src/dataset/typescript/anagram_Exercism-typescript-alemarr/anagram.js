"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Anagram = void 0;
class Anagram {
    constructor(word) {
        this.word = word;
    }
    matches(...potentials) {
        const sorted = this.word.toLowerCase()
            .split('')
            .sort()
            .join('');
        const output = [];
        potentials.forEach(word => {
            if (word.toLowerCase() == this.word.toLowerCase()) {
                return;
            }
            const reversedWord = word.toLowerCase()
                .split('')
                .sort()
                .join('');
            if (reversedWord == sorted) {
                output.push(word);
            }
        });
        return output;
    }
}
exports.Anagram = Anagram;
