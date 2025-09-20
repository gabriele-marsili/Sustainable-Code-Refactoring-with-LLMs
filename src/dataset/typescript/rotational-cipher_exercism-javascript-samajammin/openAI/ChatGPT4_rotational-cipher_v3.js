"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RotationalCipher {
    static rotate(message, key) {
        const keyMod = key % this.alphabetLength;
        return Array.from(message, char => {
            const charCode = char.charCodeAt(0);
            if (char >= 'A' && char <= 'Z') {
                return String.fromCharCode(((charCode - 65 + keyMod) % this.alphabetLength) + 65);
            }
            else if (char >= 'a' && char <= 'z') {
                return String.fromCharCode(((charCode - 97 + keyMod) % this.alphabetLength) + 97);
            }
            return char;
        }).join('');
    }
}
RotationalCipher.alphabet = 'abcdefghijklmnopqrstuvwxyz';
RotationalCipher.alphabetLength = RotationalCipher.alphabet.length;
exports.default = RotationalCipher;
