"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = convert;
function convert(num) {
    const parts = [];
    if (num % 3 === 0)
        parts.push('Pling');
    if (num % 5 === 0)
        parts.push('Plang');
    if (num % 7 === 0)
        parts.push('Plong');
    return parts.length ? parts.join('') : String(num);
}
