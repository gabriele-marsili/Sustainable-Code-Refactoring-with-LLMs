"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RunLengthEncoding {
    static encode(str) {
        let res = '';
        let curCount = 1;
        for (let i = 0; i < str.length; i++) {
            const curChar = str[i];
            if (i + 1 < str.length && curChar === str[i + 1]) {
                curCount++;
            }
            else {
                if (curCount > 1) {
                    res += curCount.toString();
                }
                res += curChar;
                curCount = 1;
            }
        }
        return res;
    }
    static decode(str) {
        let res = '';
        let num = '';
        for (let i = 0; i < str.length; i++) {
            const char = str[i];
            if (char >= '0' && char <= '9') {
                num += char;
            }
            else {
                const repeatCount = num ? parseInt(num, 10) : 1;
                res += char.repeat(repeatCount);
                num = '';
            }
        }
        return res;
    }
}
exports.default = RunLengthEncoding;
