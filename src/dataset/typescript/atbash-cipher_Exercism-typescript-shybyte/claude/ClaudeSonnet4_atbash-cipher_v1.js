"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aCode = 97; // 'a'.charCodeAt(0)
const zCode = 122; // 'z'.charCodeAt(0)
const isDigit = (code) => code >= 48 && code <= 57; // 0-9
const translateChar = (code) => String.fromCharCode(zCode - (code - aCode));
class AtbashCipher {
    constructor() {
        this.encode = (s) => {
            let result = '';
            let count = 0;
            for (let i = 0; i < s.length; i++) {
                const code = s.charCodeAt(i);
                if (isDigit(code)) {
                    if (count === 5) {
                        result += ' ';
                        count = 0;
                    }
                    result += s[i];
                    count++;
                }
                else if (code >= aCode && code <= zCode) {
                    if (count === 5) {
                        result += ' ';
                        count = 0;
                    }
                    result += translateChar(code);
                    count++;
                }
                else if (code >= 65 && code <= 90) { // A-Z
                    if (count === 5) {
                        result += ' ';
                        count = 0;
                    }
                    result += translateChar(code + 32); // convert to lowercase
                    count++;
                }
            }
            return result;
        };
        this.decode = (text) => {
            let result = '';
            for (let i = 0; i < text.length; i++) {
                const code = text.charCodeAt(i);
                if (code >= aCode && code <= zCode) {
                    result += String.fromCharCode(zCode - code + aCode);
                }
                else if (isDigit(code)) {
                    result += text[i];
                }
            }
            return result;
        };
    }
}
exports.default = AtbashCipher;
