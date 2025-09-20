"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aCode = 97;
const zCode = 122;
class AtbashCipher {
    constructor() {
        this.encode = (s) => {
            let result = '';
            let count = 0;
            for (let i = 0; i < s.length; i++) {
                const code = s.charCodeAt(i);
                if (code >= 48 && code <= 57) {
                    result += s[i];
                    count++;
                }
                else if (code >= 65 && code <= 90) {
                    result += String.fromCharCode(zCode - (code + 32 - aCode));
                    count++;
                }
                else if (code >= 97 && code <= 122) {
                    result += String.fromCharCode(zCode - (code - aCode));
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
            for (let i = 0; i < text.length; i++) {
                const code = text.charCodeAt(i);
                if (code >= 97 && code <= 122) {
                    result += String.fromCharCode(zCode - code + aCode);
                }
                else if (code >= 48 && code <= 57) {
                    result += text[i];
                }
            }
            return result;
        };
    }
}
exports.default = AtbashCipher;
