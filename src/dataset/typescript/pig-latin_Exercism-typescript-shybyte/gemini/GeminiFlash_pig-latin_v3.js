"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function translateWord(word) {
    let consonantHead = '';
    let tail = word;
    if (word.startsWith('qu')) {
        consonantHead = 'qu';
        tail = word.substring(2);
    }
    else if (word.startsWith('y')) {
        consonantHead = 'y';
        tail = word.substring(1);
    }
    else {
        let i = 0;
        while (i < word.length) {
            const char = word[i];
            if (/[auoiey]/.test(char)) {
                break;
            }
            i++;
        }
        if (i > 0) {
            consonantHead = word.substring(0, i);
            tail = word.substring(i);
        }
    }
    return tail + consonantHead + 'ay';
}
class PigLatin {
    static translate(text) {
        const words = text.split(/\s+/);
        const translatedWords = [];
        for (let i = 0; i < words.length; i++) {
            translatedWords.push(translateWord(words[i]));
        }
        return translatedWords.join(' ');
    }
}
exports.default = PigLatin;
