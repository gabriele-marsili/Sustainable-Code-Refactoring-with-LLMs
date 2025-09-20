"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RunLengthEncoding {
    static encode(str) {
        let res = '';
        let curCount = 1;
        for (let i = 1; i <= str.length; i++) {
            if (str[i] === str[i - 1]) {
                curCount++;
            }
            else {
                if (curCount > 1)
                    res += curCount;
                res += str[i - 1];
                curCount = 1;
            }
        }
        return res;
    }
    static decode(str) {
        let res = '';
        let i = 0;
        while (i < str.length) {
            let numStart = i;
            while (Number(str[i]))
                i++;
            const count = numStart < i ? parseInt(str.slice(numStart, i)) : 1;
            res += str[i].repeat(count);
            i++;
        }
        return res;
    }
}
exports.default = RunLengthEncoding;
