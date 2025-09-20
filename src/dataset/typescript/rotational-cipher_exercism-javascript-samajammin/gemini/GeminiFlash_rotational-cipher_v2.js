"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RotationalCipher {
    static rotate(message, key) {
        let result = '';
        const lowerAlphabet = RotationalCipher.alphabet;
        const upperAlphabet = lowerAlphabet.toUpperCase();
        for (let i = 0; i < message.length; i++) {
            const char = message[i];
            const charCode = char.charCodeAt(0);
            if (charCode >= 65 && charCode <= 90) { // A-Z
                const index = charCode - 65;
                result += upperAlphabet[(index + key) % RotationalCipher.alphabetLength];
            }
            else if (charCode >= 97 && charCode <= 122) { // a-z
                const index = charCode - 97;
                result += lowerAlphabet[(index + key) % RotationalCipher.alphabetLength];
            }
            else {
                result += char;
            }
        }
        return result;
    }
}
RotationalCipher.alphabet = 'abcdefghijklmnopqrstuvwxyz';
RotationalCipher.alphabetLength = RotationalCipher.alphabet.length;
exports.default = RotationalCipher;
