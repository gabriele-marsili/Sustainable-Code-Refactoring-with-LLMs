"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Anagram = void 0;
class Anagram {
    constructor(word) {
        this.word = word;
        this.lowerCaseWord = word.toLowerCase();
        this.sortedWord = this.sortString(this.lowerCaseWord);
    }
    matches(...potentials) {
        return potentials.filter(word => {
            const lowerCaseWord = word.toLowerCase();
            return lowerCaseWord !== this.lowerCaseWord && this.sortString(lowerCaseWord) === this.sortedWord;
        });
    }
    sortString(word) {
        return word.split('').sort().join('');
    }
}
exports.Anagram = Anagram;
