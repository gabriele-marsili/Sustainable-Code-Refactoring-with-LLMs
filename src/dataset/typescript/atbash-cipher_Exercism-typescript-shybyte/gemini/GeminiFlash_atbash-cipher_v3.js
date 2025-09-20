"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aCode = 'a'.charCodeAt(0);
const zCode = 'z'.charCodeAt(0);
const zeroCode = '0'.charCodeAt(0);
const nineCode = '9'.charCodeAt(0);
const space = ' ';
const translateChar = (char) => {
    const charCode = char.charCodeAt(0);
    return String.fromCharCode(zCode - (charCode - aCode));
};
const isLowerAlpha = (charCode) => charCode >= aCode && charCode <= zCode;
const isDigit = (charCode) => charCode >= zeroCode && charCode <= nineCode;
class AtbashCipher {
    constructor() {
        this.encode = (s) => {
            let encoded = '';
            let count = 0;
            for (let i = 0; i < s.length; i++) {
                const char = s[i].toLowerCase();
                const charCode = char.charCodeAt(0);
                if (isLowerAlpha(charCode) || isDigit(charCode)) {
                    let translatedChar;
                    if (isDigit(charCode)) {
                        translatedChar = char;
                    }
                    else {
                        translatedChar = translateChar(char);
                    }
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
                if (isLowerAlpha(charCode)) {
                    decoded += String.fromCharCode(zCode - charCode + aCode);
                }
                else if (isDigit(charCode)) {
                    decoded += char;
                }
            }
            return decoded;
        };
    }
}
exports.default = AtbashCipher;
