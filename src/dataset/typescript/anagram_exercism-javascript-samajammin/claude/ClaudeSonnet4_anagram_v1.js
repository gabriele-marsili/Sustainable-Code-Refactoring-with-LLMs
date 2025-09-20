"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Anagram {
    constructor(anagram) {
        this.anagram = anagram.toLowerCase();
        this.sortedAnagram = this.anagram.split('').sort().join('');
    }
    isAnagram(word) {
        if (this.anagram === word || this.anagram.length !== word.length) {
            return false;
        }
        return this.sortedAnagram === word.split('').sort().join('');
    }
    matches(...words) {
        const result = [];
        for (let i = 0; i < words.length; i++) {
            const lowerWord = words[i].toLowerCase();
            if (this.isAnagram(lowerWord)) {
                result.push(words[i]);
            }
        }
        return result;
    }
}
exports.default = Anagram;
