"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pangram {
    constructor(word) {
        this.regex = /^[a-zA-Z]$/;
        this.word = word;
    }
    isPangram() {
        const abc = new Set();
        this.word.split("")
            .filter(l => this.regex.test(l))
            .forEach(l => abc.add(l.toLowerCase()));
        return abc.size === 26;
    }
}
exports.default = Pangram;
