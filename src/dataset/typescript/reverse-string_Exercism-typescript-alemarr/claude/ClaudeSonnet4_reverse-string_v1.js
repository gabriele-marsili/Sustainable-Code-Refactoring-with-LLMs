"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reverse = reverse;
function reverse(input) {
    if (input.length <= 1)
        return input;
    let result = '';
    for (let i = input.length - 1; i >= 0; i--) {
        result += input[i];
    }
    return result;
}
