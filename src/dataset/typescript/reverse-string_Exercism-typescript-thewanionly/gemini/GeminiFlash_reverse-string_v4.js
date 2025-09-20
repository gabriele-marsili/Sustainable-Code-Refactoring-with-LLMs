"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reverse = reverse;
function reverse(string) {
    let reversedString = "";
    for (let i = string.length - 1; i >= 0; i--) {
        reversedString += string[i];
    }
    return reversedString;
}
