"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReverseString {
    static reverse(input) {
        let reversed = "";
        for (let i = input.length - 1; i >= 0; i--) {
            reversed += input[i];
        }
        return reversed;
    }
}
exports.default = ReverseString;
