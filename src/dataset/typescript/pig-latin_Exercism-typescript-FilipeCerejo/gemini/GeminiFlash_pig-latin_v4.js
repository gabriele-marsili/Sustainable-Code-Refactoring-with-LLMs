"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate = translate;
function translate(word) {
    return word
        .split(' ')
        .map((w) => {
        const lowerW = w.toLowerCase();
        const firstChar = lowerW.charAt(0);
        if (/[aeiou]/.test(firstChar)) {
            return lowerW + 'ay';
        }
        if (lowerW.startsWith('ch')) {
            return lowerW.substring(2) + 'chay';
        }
        if (lowerW.startsWith('qu')) {
            return lowerW.substring(2) + 'quay';
        }
        if (lowerW.startsWith('squ')) {
            return lowerW.substring(3) + 'squay';
        }
        if (lowerW.startsWith('th')) {
            return lowerW.substring(2) + 'thay';
        }
        if (lowerW.startsWith('thr')) {
            return lowerW.substring(3) + 'thray';
        }
        if (lowerW.startsWith('sch')) {
            return lowerW.substring(3) + 'schay';
        }
        if (/[^aeiou]/.test(firstChar)) {
            return lowerW.substring(1) + firstChar + 'ay';
        }
        return lowerW;
    })
        .join(' ');
}
