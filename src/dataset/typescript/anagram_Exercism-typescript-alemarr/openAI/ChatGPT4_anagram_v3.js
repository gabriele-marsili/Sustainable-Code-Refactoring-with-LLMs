"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Anagram = void 0;
class Anagram {
    constructor(word) {
        this.word = word;
        this.lowerWord = word.toLowerCase();
        this.sortedWord = this.sortString(this.lowerWord);
    }
    matches(...potentials) {
        return potentials.filter(word => {
            const lowerWord = word.toLowerCase();
            return lowerWord !== this.lowerWord && this.sortString(lowerWord) === this.sortedWord;
        });
    }
    sortString(word) {
        return [...word].sort().join('');
    }
}
exports.Anagram = Anagram;
