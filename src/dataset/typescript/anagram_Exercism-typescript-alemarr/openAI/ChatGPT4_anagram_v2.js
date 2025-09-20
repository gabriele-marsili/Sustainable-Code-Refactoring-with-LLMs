"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Anagram = void 0;
class Anagram {
    constructor(word) {
        this.word = word;
        this.lowerCaseWord = word.toLowerCase();
        this.sortedWord = this.sortString(this.lowerCaseWord);
    }
    matches(...potentials) {
        return potentials.filter(word => {
            const lowerCasePotential = word.toLowerCase();
            return (lowerCasePotential !== this.lowerCaseWord &&
                this.sortString(lowerCasePotential) === this.sortedWord);
        });
    }
    sortString(str) {
        return str.split('').sort().join('');
    }
}
exports.Anagram = Anagram;
