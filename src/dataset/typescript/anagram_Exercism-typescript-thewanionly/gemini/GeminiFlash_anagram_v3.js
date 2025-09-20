"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Anagram = void 0;
class Anagram {
    constructor(word) {
        this.word = word;
        this.lowerCaseWord = word.toLowerCase();
        this.sortedWord = this.sortString(this.lowerCaseWord);
    }
    matches(...candidates) {
        return candidates.filter((candidate) => {
            const lowerCaseCandidate = candidate.toLowerCase();
            if (this.lowerCaseWord === lowerCaseCandidate) {
                return false;
            }
            return this.sortedWord === this.sortString(lowerCaseCandidate);
        });
    }
    sortString(str) {
        return str.split('').sort().join('');
    }
}
exports.Anagram = Anagram;
