"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Anagram = void 0;
class Anagram {
    constructor(word) {
        this.normalizedWord = word.toLowerCase();
        this.sortedWord = this.rearrange(this.normalizedWord);
    }
    matches(...candidates) {
        const result = [];
        for (const candidate of candidates) {
            const normalizedCandidate = candidate.toLowerCase();
            if (this.normalizedWord !== normalizedCandidate &&
                this.sortedWord === this.rearrange(normalizedCandidate)) {
                result.push(candidate);
            }
        }
        return result;
    }
    rearrange(word) {
        return word.split('').sort().join('');
    }
}
exports.Anagram = Anagram;
