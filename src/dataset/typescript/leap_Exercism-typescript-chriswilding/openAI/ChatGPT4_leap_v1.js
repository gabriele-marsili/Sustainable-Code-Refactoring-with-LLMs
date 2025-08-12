"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isLeapYear(year) {
    if ((year & 3) !== 0)
        return false;
    if (year % 25 === 0 && year % 16 !== 0)
        return false;
    return true;
}
exports.default = isLeapYear;
