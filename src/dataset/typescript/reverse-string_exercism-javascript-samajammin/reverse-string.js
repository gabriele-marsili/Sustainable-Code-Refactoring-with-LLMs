"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReverseString {
    static reverse(str) {
        let reversed = '';
        for (let char of str) {
            reversed = char + reversed;
        }
        return reversed;
    }
}
exports.default = ReverseString;
