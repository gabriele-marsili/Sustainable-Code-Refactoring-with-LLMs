"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Anagram = void 0;
class Anagram {
    constructor(word) {
        this.word = word;
    }
    matches(...candidates) {
        return candidates.filter((candidate) => this.word.toLowerCase() !== candidate.toLowerCase() &&
            this.rearrange(this.word) === this.rearrange(candidate));
    }
    rearrange(word) {
        return word
            .split('')
            .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
            .join('')
            .toLowerCase();
    }
}
exports.Anagram = Anagram;
