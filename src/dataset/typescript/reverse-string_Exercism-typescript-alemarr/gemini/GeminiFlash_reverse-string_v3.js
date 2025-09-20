"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reverse = reverse;
function reverse(input) {
    let reversed = "";
    for (let i = input.length - 1; i >= 0; i--) {
        reversed += input[i];
    }
    return reversed;
}
