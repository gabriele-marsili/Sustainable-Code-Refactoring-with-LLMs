"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReverseString {
    static reverse(s) {
        if (s.length <= 1)
            return s;
        let result = '';
        for (let i = s.length - 1; i >= 0; i--) {
            result += s[i];
        }
        return result;
    }
}
exports.default = ReverseString;
