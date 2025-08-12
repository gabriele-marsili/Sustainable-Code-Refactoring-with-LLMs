"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isLeapYear(year) {
    // A year is a leap year if it is divisible by 400.
    // OR if it is divisible by 4 but not by 100.
    // This structure leverages short-circuiting of logical operators (|| and &&)
    // to minimize the number of modulo operations and comparisons performed.
    return (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);
}
exports.default = isLeapYear;
