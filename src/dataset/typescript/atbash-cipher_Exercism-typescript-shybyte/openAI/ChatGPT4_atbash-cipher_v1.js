"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aCode = 97; // 'a'.charCodeAt(0)
const zCode = 122; // 'z'.charCodeAt(0)
const isNumber = (char) => char >= '0' && char <= '9';
const translate = (char) => String.fromCharCode(zCode - (char.charCodeAt(0) - aCode));
class AtbashCipher {
    constructor() {
        this.encode = (s) => {
            let result = '';
            let count = 0;
            for (const char of s.toLowerCase()) {
                if (char >= 'a' && char <= 'z') {
                    result += translate(char);
                    count++;
                }
                else if (isNumber(char)) {
                    result += char;
                    count++;
                }
                if (count === 5) {
                    result += ' ';
                    count = 0;
                }
            }
            return result.trim();
        };
        this.decode = (text) => {
            let result = '';
            for (const char of text) {
                if (char >= 'a' && char <= 'z') {
                    result += String.fromCharCode(zCode - char.charCodeAt(0) + aCode);
                }
                else if (isNumber(char)) {
                    result += char;
                }
            }
            return result;
        };
    }
}
exports.default = AtbashCipher;
