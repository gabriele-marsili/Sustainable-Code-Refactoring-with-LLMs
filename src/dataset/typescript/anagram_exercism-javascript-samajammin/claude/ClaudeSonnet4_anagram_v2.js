"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Anagram {
    constructor(anagram) {
        this.anagram = anagram.toLowerCase();
        this.sortedAnagram = this.anagram.split('').sort().join('');
        this.anagramLength = this.anagram.length;
    }
    isAnagram(word) {
        if (this.anagram === word || word.length !== this.anagramLength) {
            return false;
        }
        return word.split('').sort().join('') === this.sortedAnagram;
    }
    matches(...words) {
        return words.filter((word) => this.isAnagram(word.toLowerCase()));
    }
}
exports.default = Anagram;
