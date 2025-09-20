"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReverseString {
    static reverse(input) {
        let reversedString = "";
        for (let i = input.length - 1; i >= 0; i--) {
            reversedString += input[i];
        }
        return reversedString;
    }
}
exports.default = ReverseString;
