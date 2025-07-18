"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RunLengthEncoding {
    static encode(str) {
        let res = '';
        let curCount = 1;
        for (let i = 0; i < str.length; i++) {
            const curChar = str[i];
            if (curChar === str[i + 1]) {
                ++curCount;
                continue;
            }
            if (curCount > 1) {
                res += curCount;
                curCount = 1;
            }
            res += curChar;
        }
        return res;
    }
    static decode(str) {
        let res = '';
        let num = '';
        for (const char of str) {
            if (Number(char)) {
                num += char;
            }
            else {
                num ? (res += char.repeat(Number(num))) : (res += char);
                num = '';
            }
        }
        return res;
    }
}
exports.default = RunLengthEncoding;
