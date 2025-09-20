"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReverseString {
    static reverse(input) {
        let result = '';
        for (let i = input.length - 1; i >= 0; i--) {
            result += input[i];
        }
        return result;
    }
}
exports.default = ReverseString;
