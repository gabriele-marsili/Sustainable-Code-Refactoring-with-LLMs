"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPangram = isPangram;
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
function isPangram(phrase) {
    const lettersSet = new Set();
    phrase.split('').forEach(l => {
        if (alphabet.indexOf(l.toLowerCase()) > -1) {
            lettersSet.add(l.toLowerCase());
        }
    });
    return lettersSet.size === alphabet.length;
}
