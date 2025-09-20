"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RotationalCipher {
    static rotate(message, key) {
        const normalizedKey = ((key % 26) + 26) % 26;
        if (normalizedKey === 0)
            return message;
        let result = '';
        for (let i = 0; i < message.length; i++) {
            const char = message[i];
            const charCode = char.charCodeAt(0);
            if (charCode >= 65 && charCode <= 90) {
                result += String.fromCharCode(((charCode - 65 + normalizedKey) % 26) + 65);
            }
            else if (charCode >= 97 && charCode <= 122) {
                result += String.fromCharCode(((charCode - 97 + normalizedKey) % 26) + 97);
            }
            else {
                result += char;
            }
        }
        return result;
    }
}
RotationalCipher.alphabet = 'abcdefghijklmnopqrstuvwxyz';
exports.default = RotationalCipher;
