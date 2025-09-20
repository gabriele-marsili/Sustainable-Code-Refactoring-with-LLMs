"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RotationalCipher {
    static rotate(message, key) {
        const normalizedKey = ((key % 26) + 26) % 26;
        if (normalizedKey === 0)
            return message;
        let result = '';
        for (let i = 0; i < message.length; i++) {
            const charCode = message.charCodeAt(i);
            if (charCode >= 65 && charCode <= 90) { // A-Z
                result += String.fromCharCode(((charCode - 65 + normalizedKey) % 26) + 65);
            }
            else if (charCode >= 97 && charCode <= 122) { // a-z
                result += String.fromCharCode(((charCode - 97 + normalizedKey) % 26) + 97);
            }
            else {
                result += message[i];
            }
        }
        return result;
    }
}
exports.default = RotationalCipher;
