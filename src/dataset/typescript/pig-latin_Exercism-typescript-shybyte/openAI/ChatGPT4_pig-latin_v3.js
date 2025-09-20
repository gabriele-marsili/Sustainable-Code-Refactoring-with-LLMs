"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function translateWord(word) {
    const [_, consonantHead = '', tail = ''] = word.match(/^([^auoie]*qu|^y|[^auoiey]*)(.*)$/) || [];
    return `${tail}${consonantHead}ay`;
}
class PigLatin {
    static translate(text) {
        return text.replace(/\S+/g, translateWord);
    }
}
exports.default = PigLatin;
