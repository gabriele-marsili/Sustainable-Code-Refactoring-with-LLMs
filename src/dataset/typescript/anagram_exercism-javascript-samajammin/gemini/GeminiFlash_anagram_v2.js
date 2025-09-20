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
        if (this.anagram.length !== word.length) {
            return false;
        }
        return this.sortedAnagram === [...word].sort().join('');
    }
    matches(...words) {
        return words.filter((word) => this.isAnagram(word.toLowerCase()));
    }
}
exports.default = Anagram;
