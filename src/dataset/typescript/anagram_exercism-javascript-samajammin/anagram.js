"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Anagram {
    constructor(anagram) {
        this.anagram = anagram.toLowerCase();
        this.sortedAnagram = [...this.anagram].sort().join('');
    }
    isAnagram(word) {
        if (this.anagram === word) {
            return false;
        }
        const sortedWord = [...word].sort().join('');
        return this.sortedAnagram === sortedWord;
    }
    matches(...words) {
        return words.filter((word) => {
            const lowerCaseWord = word.toLowerCase();
            return this.isAnagram(lowerCaseWord);
        });
    }
}
exports.default = Anagram;
