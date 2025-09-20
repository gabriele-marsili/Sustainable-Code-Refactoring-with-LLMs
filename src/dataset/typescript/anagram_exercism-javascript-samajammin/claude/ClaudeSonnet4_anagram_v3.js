"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Anagram {
    constructor(anagram) {
        this.anagramLower = anagram.toLowerCase();
        this.anagramSorted = this.anagramLower.split('').sort().join('');
    }
    isAnagram(word) {
        if (this.anagramLower === word) {
            return false;
        }
        if (this.anagramLower.length !== word.length) {
            return false;
        }
        return this.anagramSorted === word.split('').sort().join('');
    }
    matches(...words) {
        return words.filter((word) => this.isAnagram(word.toLowerCase()));
    }
}
exports.default = Anagram;
