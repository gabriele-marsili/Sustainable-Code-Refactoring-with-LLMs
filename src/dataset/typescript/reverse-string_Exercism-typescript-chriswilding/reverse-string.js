"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReverseString {
    static reverse(input) {
        return input.split('')
            .reverse()
            .join('');
    }
}
exports.default = ReverseString;
