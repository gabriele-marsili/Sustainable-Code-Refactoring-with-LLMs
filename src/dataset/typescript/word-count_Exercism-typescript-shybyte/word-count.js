"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Words {
    count(text) {
        const words = text.trim().toLowerCase().split(/\s+/);
        const wordCounts = new Map();
        for (const word of words) {
            wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
        }
        return wordCounts;
    }
}
exports.default = Words;
