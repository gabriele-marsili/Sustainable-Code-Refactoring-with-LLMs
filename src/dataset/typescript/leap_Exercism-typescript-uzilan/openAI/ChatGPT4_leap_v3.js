"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isLeapYear(year) {
    const divisibleBy4 = (year & 3) === 0;
    return divisibleBy4 && (year % 25 !== 0 || year % 16 === 0);
}
exports.default = isLeapYear;
