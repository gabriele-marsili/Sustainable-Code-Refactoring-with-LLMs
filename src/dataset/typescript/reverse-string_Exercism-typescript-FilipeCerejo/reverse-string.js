"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reverse = reverse;
function reverse(chars) {
    let reversed = '';
    for (let w = chars.length - 1; w >= 0; w--) {
        reversed += chars[w];
    }
    return reversed;
}
