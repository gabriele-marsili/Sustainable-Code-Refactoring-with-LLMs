"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function translateWord(word) {
    let i = 0;
    const len = word.length;
    // Handle 'qu' at the beginning
    if (word[0] === 'q' && word[1] === 'u') {
        i = 2;
    }
    // Handle 'y' at the beginning
    else if (word[0] === 'y') {
        i = 1;
    }
    // Find consonant cluster
    else {
        while (i < len) {
            const char = word[i];
            if (char === 'a' || char === 'e' || char === 'i' || char === 'o' || char === 'u') {
                break;
            }
            if (char === 'y' && i > 0) {
                break;
            }
            i++;
        }
    }
    return word.slice(i) + word.slice(0, i) + 'ay';
}
class PigLatin {
    static translate(text) {
        let result = '';
        let wordStart = 0;
        let i = 0;
        const len = text.length;
        while (i <= len) {
            const char = text[i];
            if (i === len || char === ' ' || char === '\t' || char === '\n' || char === '\r') {
                if (i > wordStart) {
                    if (result)
                        result += ' ';
                    result += translateWord(text.slice(wordStart, i));
                }
                // Skip whitespace
                while (i < len && (text[i] === ' ' || text[i] === '\t' || text[i] === '\n' || text[i] === '\r')) {
                    i++;
                }
                wordStart = i;
            }
            else {
                i++;
            }
        }
        return result;
    }
}
exports.default = PigLatin;
