"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLeap = isLeap;
function isLeap(year) {
    if (year % 4 !== 0)
        return false;
    if (year % 100 !== 0)
        return true;
    return year % 400 === 0;
}
