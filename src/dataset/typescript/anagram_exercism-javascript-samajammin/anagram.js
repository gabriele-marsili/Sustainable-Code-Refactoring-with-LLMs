"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Anagram {
    constructor(anagram) {
        this.anagram = anagram.toLowerCase();
    }
    isAnagram(word) {
        if (this.anagram === word) {
            return false;
        }
        return [...this.anagram].sort().join('') === [...word].sort().join('');
    }
    matches(...words) {
        return words.filter((word) => this.isAnagram(word.toLowerCase()));
    }
}
exports.default = Anagram;
