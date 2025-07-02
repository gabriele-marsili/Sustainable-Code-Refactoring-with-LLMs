"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = convert;
function convert(num) {
    var res = '';
    if (num % 3 === 0) {
        res = 'Pling';
    }
    if (num % 5 === 0) {
        res += 'Plang';
    }
    if (num % 7 === 0) {
        res += 'Plong';
    }
    if (!res.length) {
        res = String(num);
    }
    return res;
}
