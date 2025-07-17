"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Anagram = void 0;
class Anagram {
    constructor(input) {
        this._input = input.toLowerCase();
    }
    matches(...potentials) {
        let sortedInput = [...this._input].sort().join('');
        let anagrams = [];
        potentials.forEach((p) => {
            let sortedP = [...p.toLowerCase()].sort().join('');
            console.log('sortedInput', sortedInput, 'sortedP', sortedP);
            if (sortedP === sortedInput && p.toLowerCase() !== this._input)
                anagrams.push(p);
        });
        return anagrams;
    }
}
exports.Anagram = Anagram;
