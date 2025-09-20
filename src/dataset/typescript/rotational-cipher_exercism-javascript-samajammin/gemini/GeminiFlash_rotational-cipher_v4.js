"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RotationalCipher {
    static rotate(message, key) {
        if (key === 0) {
            return message;
        }
        const rotatedChars = [];
        const keyModAlphabetLength = key % this.alphabetLength;
        for (let i = 0; i < message.length; i++) {
            const char = message[i];
            const charCode = char.charCodeAt(0);
            if (charCode >= 65 && charCode <= 90) {
                const rotatedCharCode = ((charCode - 65 + keyModAlphabetLength) % this.alphabetLength) + 65;
                rotatedChars.push(String.fromCharCode(rotatedCharCode));
            }
            else if (charCode >= 97 && charCode <= 122) {
                const rotatedCharCode = ((charCode - 97 + keyModAlphabetLength) % this.alphabetLength) + 97;
                rotatedChars.push(String.fromCharCode(rotatedCharCode));
            }
            else {
                rotatedChars.push(char);
            }
        }
        return rotatedChars.join('');
    }
}
RotationalCipher.alphabet = 'abcdefghijklmnopqrstuvwxyz';
RotationalCipher.alphabetLength = 26;
exports.default = RotationalCipher;
