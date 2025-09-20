"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aCode = 'a'.charCodeAt(0);
const zCode = 'z'.charCodeAt(0);
const zeroCode = '0'.charCodeAt(0);
const nineCode = '9'.charCodeAt(0);
const space = ' ';
const translate = (charCode) => String.fromCharCode(zCode - (charCode - aCode));
class AtbashCipher {
    constructor() {
        this.encode = (s) => {
            let encoded = '';
            let count = 0;
            for (let i = 0; i < s.length; i++) {
                const char = s[i].toLowerCase();
                const charCode = char.charCodeAt(0);
                if ((charCode >= aCode && charCode <= zCode) || (charCode >= zeroCode && charCode <= nineCode)) {
                    const translatedChar = (charCode >= zeroCode && charCode <= nineCode) ? char : translate(charCode);
                    encoded += translatedChar;
                    count++;
                    if (count % 5 === 0) {
                        encoded += space;
                    }
                }
            }
            return encoded.trim();
        };
        this.decode = (text) => {
            let decoded = '';
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                const charCode = char.charCodeAt(0);
                if (charCode >= aCode && charCode <= zCode) {
                    decoded += String.fromCharCode(zCode - charCode + aCode);
                }
                else if (charCode >= zeroCode && charCode <= nineCode) {
                    decoded += char;
                }
            }
            return decoded;
        };
    }
}
exports.default = AtbashCipher;
