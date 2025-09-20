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
        const lowerCasedWords = words.map((word) => word.toLowerCase());
        return lowerCasedWords.filter((word) => this.isAnagram(word));
    }
}
exports.default = Anagram;
