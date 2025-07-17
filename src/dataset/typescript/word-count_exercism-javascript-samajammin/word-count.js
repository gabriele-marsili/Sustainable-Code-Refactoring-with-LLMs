"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Words {
    count(phrase) {
        const words = phrase
            .trim()
            .split(/\s+/)
            .map(word => word.toLowerCase());
        let counts = new Map();
        words.forEach(word => {
            const wordCount = counts.get(word) || 0;
            counts.set(word, wordCount + 1);
        });
        return counts;
    }
}
exports.default = Words;
