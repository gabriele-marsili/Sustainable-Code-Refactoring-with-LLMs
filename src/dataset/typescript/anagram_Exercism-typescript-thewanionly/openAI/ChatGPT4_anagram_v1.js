"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Anagram = void 0;
class Anagram {
    constructor(word) {
        this.word = word.toLowerCase();
        this.normalizedWord = this.word;
        this.sortedWord = this.sortWord(this.word);
    }
    matches(...candidates) {
        return candidates.filter((candidate) => {
            const normalizedCandidate = candidate.toLowerCase();
            return (this.normalizedWord !== normalizedCandidate &&
                this.sortedWord === this.sortWord(normalizedCandidate));
        });
    }
    sortWord(word) {
        return [...word].sort().join('');
    }
}
exports.Anagram = Anagram;
