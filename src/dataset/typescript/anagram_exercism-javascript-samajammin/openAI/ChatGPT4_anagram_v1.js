"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Anagram {
    constructor(anagram) {
        this.anagram = anagram.toLowerCase();
        this.sortedAnagram = this.sortString(this.anagram);
    }
    sortString(word) {
        return word.split('').sort().join('');
    }
    isAnagram(word) {
        return this.anagram !== word && this.sortedAnagram === this.sortString(word);
    }
    matches(...words) {
        return words.filter((word) => this.isAnagram(word.toLowerCase()));
    }
}
exports.default = Anagram;
