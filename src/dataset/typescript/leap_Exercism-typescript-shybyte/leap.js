"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isLeapYear(year) {
    const isDivisibleBy = (x) => year % x === 0;
    return isDivisibleBy(400) || (isDivisibleBy(4) && !isDivisibleBy(100));
}
exports.default = isLeapYear;
