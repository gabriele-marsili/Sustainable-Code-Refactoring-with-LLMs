"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Anagram = void 0;
class Anagram {
    constructor(word) {
        this.normalizedWord = word.toLowerCase();
        this.sortedWord = Anagram.sortWord(this.normalizedWord);
    }
    matches(...candidates) {
        return candidates.filter((candidate) => {
            const normalizedCandidate = candidate.toLowerCase();
            return (this.normalizedWord !== normalizedCandidate &&
                this.sortedWord === Anagram.sortWord(normalizedCandidate));
        });
    }
    static sortWord(word) {
        return word.split('').sort().join('');
    }
}
exports.Anagram = Anagram;
