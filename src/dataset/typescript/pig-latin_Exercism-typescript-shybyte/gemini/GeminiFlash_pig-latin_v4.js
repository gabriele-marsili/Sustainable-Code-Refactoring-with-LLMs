"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function translateWord(word) {
    const firstLetter = word.charAt(0);
    if (/[aeiou]/.test(firstLetter)) {
        return word + 'ay';
    }
    if (word.startsWith('qu')) {
        return word.slice(2) + 'quay';
    }
    if (firstLetter === 'y') {
        return word.slice(1) + 'yay';
    }
    let consonantHead = '';
    let tail = '';
    let i = 0;
    while (i < word.length) {
        const char = word.charAt(i);
        if (/[aeiouy]/.test(char)) {
            tail = word.slice(i);
            consonantHead = word.slice(0, i);
            break;
        }
        i++;
    }
    if (!tail) {
        return word + 'ay';
    }
    return tail + consonantHead + 'ay';
}
class PigLatin {
    static translate(text) {
        return text.split(/\s+/).map(translateWord).join(' ');
    }
}
exports.default = PigLatin;
