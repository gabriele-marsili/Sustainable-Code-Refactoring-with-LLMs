"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isLeapYear(year) {
    const mod4 = year & 3;
    if (mod4 !== 0)
        return false;
    if (year % 25 !== 0)
        return true;
    return year % 16 === 0;
}
exports.default = isLeapYear;
