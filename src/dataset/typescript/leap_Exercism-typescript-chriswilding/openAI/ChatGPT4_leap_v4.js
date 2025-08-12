"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isLeapYear(year) {
    if ((year & 3) !== 0)
        return false;
    if (year % 100 === 0)
        return year % 400 === 0;
    return true;
}
exports.default = isLeapYear;
