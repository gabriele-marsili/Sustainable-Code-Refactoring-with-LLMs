"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Anagram = void 0;
class Anagram {
    constructor(word) {
        this.lowerWord = word.toLowerCase();
        this.normalizedWord = this.lowerWord.split('').sort().join('');
    }
    matches(...candidates) {
        const result = [];
        for (const candidate of candidates) {
            const lowerCandidate = candidate.toLowerCase();
            if (this.lowerWord !== lowerCandidate &&
                this.normalizedWord === lowerCandidate.split('').sort().join('')) {
                result.push(candidate);
            }
        }
        return result;
    }
}
exports.Anagram = Anagram;
