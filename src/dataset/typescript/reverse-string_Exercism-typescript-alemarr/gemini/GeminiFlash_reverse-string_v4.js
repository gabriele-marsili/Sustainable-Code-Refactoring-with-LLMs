"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reverse = reverse;
function reverse(input) {
    let reversedString = "";
    for (let i = input.length - 1; i >= 0; i--) {
        reversedString += input[i];
    }
    return reversedString;
}
