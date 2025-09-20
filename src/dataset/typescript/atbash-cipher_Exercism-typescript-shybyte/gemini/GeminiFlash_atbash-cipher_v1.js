"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aCode = 'a'.charCodeAt(0);
const zCode = 'z'.charCodeAt(0);
const translate = (charCode) => String.fromCharCode(zCode - (charCode - aCode));
class AtbashCipher {
    constructor() {
        this.encode = (s) => {
            let encoded = '';
            let count = 0;
            for (let i = 0; i < s.length; i++) {
                const char = s[i].toLowerCase();
                const charCode = char.charCodeAt(0);
                if (charCode >= 48 && charCode <= 57) { // isNumber
                    encoded += char;
                    count++;
                }
                else if (charCode >= aCode && charCode <= zCode) {
                    encoded += translate(charCode);
                    count++;
                }
                if (count === 5) {
                    encoded += ' ';
                    count = 0;
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
                else if (charCode >= 48 && charCode <= 57) { // isNumber
                    decoded += char;
                }
            }
            return decoded;
        };
    }
}
AtbashCipher.chunkRegex = /.{1,5}/g;
exports.default = AtbashCipher;
