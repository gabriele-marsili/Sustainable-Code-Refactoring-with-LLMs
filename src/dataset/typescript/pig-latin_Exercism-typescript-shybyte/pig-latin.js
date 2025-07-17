"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function translateWord(word) {
    const match = /^([^auoie]*qu|^y|[^auoiey]*)(.*)$/.exec(word);
    const consonantHead = match[1];
    const tail = match[2];
    return tail + consonantHead + 'ay';
}
class PigLatin {
    static translate(text) {
        return text.split(/\s+/).map(translateWord).join(' ');
    }
}
exports.default = PigLatin;
