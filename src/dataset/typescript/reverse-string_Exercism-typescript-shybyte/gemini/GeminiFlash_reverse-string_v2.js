"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReverseString {
    static reverse(s) {
        let reversedString = "";
        for (let i = s.length - 1; i >= 0; i--) {
            reversedString += s[i];
        }
        return reversedString;
    }
}
exports.default = ReverseString;
