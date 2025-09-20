"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Anagram {
    constructor(anagram) {
        this.anagramCharCount = this.getCharCount(anagram.toLowerCase());
    }
    getCharCount(word) {
        const charCount = {};
        for (const char of word) {
            charCount[char] = (charCount[char] || 0) + 1;
        }
        return charCount;
    }
    isAnagram(word) {
        if (Object.keys(this.anagramCharCount).length !== word.length) {
            return false;
        }
        const wordCharCount = this.getCharCount(word);
        for (const char in this.anagramCharCount) {
            if (this.anagramCharCount[char] !== wordCharCount[char]) {
                return false;
            }
        }
        return true;
    }
    matches(...words) {
        return words.filter((word) => {
            const lowerWord = word.toLowerCase();
            return lowerWord !== this.anagramCharCount && this.isAnagram(lowerWord);
        });
    }
}
exports.default = Anagram;
