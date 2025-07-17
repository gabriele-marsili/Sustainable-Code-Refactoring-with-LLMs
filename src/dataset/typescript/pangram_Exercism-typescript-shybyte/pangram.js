"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ALPHABET_SIZE = 26;
class Pangram {
    constructor(text) {
        this.text = text;
    }
    isPangram() {
        const lowercase_alphabetic_chars = this.text
            .toLowerCase()
            .replace(/[^a-z]/g, '')
            .split('');
        return numberOfDistinctElements(lowercase_alphabetic_chars) === ALPHABET_SIZE;
    }
}
exports.default = Pangram;
const numberOfDistinctElements = (array) => new Set(array).size;
