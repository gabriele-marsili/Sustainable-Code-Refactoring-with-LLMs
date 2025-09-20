"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Anagram = void 0;
class Anagram {
    constructor(word) {
        this.word = word;
        this.sortedWord = this.rearrange(word);
    }
    matches(...candidates) {
        const lowerCaseWord = this.word.toLowerCase();
        return candidates.filter((candidate) => {
            const lowerCaseCandidate = candidate.toLowerCase();
            return (lowerCaseWord !== lowerCaseCandidate &&
                this.sortedWord === this.rearrange(candidate));
        });
    }
    rearrange(word) {
        return word
            .toLowerCase()
            .split('')
            .sort()
            .join('');
    }
}
exports.Anagram = Anagram;
