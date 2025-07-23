"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = convert;
function convert(num) {
    if (num % 3 !== 0 && num % 5 !== 0 && num % 7 !== 0)
        return String(num);
    let result = '';
    if (num % 3 === 0)
        result += 'Pling';
    if (num % 5 === 0)
        result += 'Plang';
    if (num % 7 === 0)
        result += 'Plong';
    return result;
}
