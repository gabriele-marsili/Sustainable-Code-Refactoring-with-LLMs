"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aCode = 'a'.charCodeAt(0);
const zCODE = 'z'.charCodeAt(0);
const isNumber = (char) => /\d/.test(char);
const translate = (char) => String.fromCharCode(zCODE - (char.charCodeAt(0) - aCode));
class AtbashCipher {
    constructor() {
        this.encode = (s) => s.toLowerCase()
            .replace(/[^\da-z]/g, '') // keep only number and lowercase letters
            .replace(/./g, (char) => isNumber(char) ? char : translate(char))
            .replace(/(.{5})/g, '$1 ') // split into chunks of length 5
            .trim();
        this.decode = (text) => [...text].map((c) => {
            if (/[a-z]/.test(c)) {
                return String.fromCharCode(zCODE - c.charCodeAt(0) + aCode);
            }
            else if (isNumber(c)) {
                return c;
            }
            return '';
        }).join('');
    }
}
exports.default = AtbashCipher;
