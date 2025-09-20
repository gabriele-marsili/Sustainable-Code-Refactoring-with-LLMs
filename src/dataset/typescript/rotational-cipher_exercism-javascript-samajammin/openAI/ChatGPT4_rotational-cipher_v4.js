"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RotationalCipher {
    static rotate(message, key) {
        const keyMod = key % this.alphabetLength;
        if (keyMod === 0)
            return message;
        const lowerAlphabet = this.alphabet;
        const upperAlphabet = lowerAlphabet.toUpperCase();
        return Array.from(message, char => {
            const lowerIndex = lowerAlphabet.indexOf(char);
            if (lowerIndex !== -1) {
                return lowerAlphabet[(lowerIndex + keyMod) % this.alphabetLength];
            }
            const upperIndex = upperAlphabet.indexOf(char);
            if (upperIndex !== -1) {
                return upperAlphabet[(upperIndex + keyMod) % this.alphabetLength];
            }
            return char;
        }).join('');
    }
}
RotationalCipher.alphabet = 'abcdefghijklmnopqrstuvwxyz';
RotationalCipher.alphabetLength = 26;
exports.default = RotationalCipher;
