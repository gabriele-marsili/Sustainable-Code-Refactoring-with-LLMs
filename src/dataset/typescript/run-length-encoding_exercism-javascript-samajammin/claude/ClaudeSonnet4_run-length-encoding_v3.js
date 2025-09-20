"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RunLengthEncoding {
    static encode(str) {
        if (!str)
            return '';
        const result = [];
        let count = 1;
        let currentChar = str[0];
        for (let i = 1; i < str.length; i++) {
            if (str[i] === currentChar) {
                count++;
            }
            else {
                if (count > 1) {
                    result.push(count.toString(), currentChar);
                }
                else {
                    result.push(currentChar);
                }
                currentChar = str[i];
                count = 1;
            }
        }
        if (count > 1) {
            result.push(count.toString(), currentChar);
        }
        else {
            result.push(currentChar);
        }
        return result.join('');
    }
    static decode(str) {
        if (!str)
            return '';
        const result = [];
        let numStr = '';
        for (const char of str) {
            if (char >= '0' && char <= '9') {
                numStr += char;
            }
            else {
                if (numStr) {
                    const count = parseInt(numStr, 10);
                    for (let i = 0; i < count; i++) {
                        result.push(char);
                    }
                    numStr = '';
                }
                else {
                    result.push(char);
                }
            }
        }
        return result.join('');
    }
}
exports.default = RunLengthEncoding;
