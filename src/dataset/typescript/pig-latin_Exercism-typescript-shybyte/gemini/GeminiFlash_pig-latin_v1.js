"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function translateWord(word) {
    let consonantHead = '';
    let tail = '';
    let i = 0;
    if (word.startsWith('qu')) {
        consonantHead = 'qu';
        i = 2;
    }
    else if (word.startsWith('y') && word.length > 1) {
        consonantHead = 'y';
        i = 1;
    }
    else {
        while (i < word.length) {
            const char = word[i];
            if (/[auoie]/.test(char)) {
                break;
            }
            consonantHead += char;
            i++;
        }
    }
    tail = word.substring(i);
    return tail + consonantHead + 'ay';
}
class PigLatin {
    static translate(text) {
        return text.split(/\s+/).map(translateWord).join(' ');
    }
}
exports.default = PigLatin;
