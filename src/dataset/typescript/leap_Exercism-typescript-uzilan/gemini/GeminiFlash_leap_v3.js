"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isLeapYear(year) {
    return (year & 3) === 0 &&
        (year % 100 !== 0 || year % 400 === 0);
}
exports.default = isLeapYear;
