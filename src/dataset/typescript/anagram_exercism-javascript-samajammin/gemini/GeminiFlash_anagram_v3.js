"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Anagram {
    constructor(anagram) {
        this.anagram = anagram.toLowerCase();
        this.anagramLength = this.anagram.length;
        this.sortedAnagram = [...this.anagram].sort().join('');
    }
    isAnagram(word) {
        if (this.anagramLength !== word.length || this.anagram === word) {
            return false;
        }
        const sortedWord = [...word].sort().join('');
        return this.sortedAnagram === sortedWord;
    }
    matches(...words) {
        return words.filter((word) => this.isAnagram(word.toLowerCase()));
    }
}
exports.default = Anagram;
