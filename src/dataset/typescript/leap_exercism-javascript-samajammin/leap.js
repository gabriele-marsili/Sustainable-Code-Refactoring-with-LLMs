"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isLeapYear(year) {
    const isDivisibleBy4 = year % 4 === 0;
    const isDivisibleBy100 = year % 100 === 0;
    const isDivisibleBy400 = year % 400 === 0;
    if (isDivisibleBy100) {
        return isDivisibleBy400 ? true : false;
    }
    return isDivisibleBy4 ? true : false;
}
exports.default = isLeapYear;
