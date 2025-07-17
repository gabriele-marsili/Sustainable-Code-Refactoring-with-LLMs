"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RotationalCipher {
    static rotate(message, key) {
        return message
            .split('')
            .map(char => {
            let isUpperCase;
            let newCharIndex;
            if (/[A-Z]/.test(char)) {
                isUpperCase = true;
                newCharIndex = this.alphabet.indexOf(char.toLowerCase());
            }
            else if (/[a-z]/.test(char)) {
                newCharIndex = this.alphabet.indexOf(char);
            }
            else {
                return char;
            }
            newCharIndex = (newCharIndex + key) % 26;
            return isUpperCase
                ? this.alphabet[newCharIndex].toUpperCase()
                : this.alphabet[newCharIndex];
        })
            .join('');
    }
}
RotationalCipher.alphabet = 'abcdefghijklmnopqrstuvwxyz';
exports.default = RotationalCipher;
