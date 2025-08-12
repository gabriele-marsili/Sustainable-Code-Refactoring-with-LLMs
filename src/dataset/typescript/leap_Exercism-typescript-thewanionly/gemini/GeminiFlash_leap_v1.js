"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLeap = isLeap;
function isLeap(year) {
    // A year is a leap year if it is divisible by 4.
    // Using a bitwise AND operation `(year & 3)` is an optimized way to check for
    // divisibility by 4, as `4` is a power of 2. If the last two bits are 0,
    // the number is divisible by 4. This is typically faster than the modulo operator (`%`).
    if ((year & 3) !== 0) { // Equivalent to year % 4 !== 0
        return false; // Not divisible by 4, so definitely not a leap year.
    }
    // If the year is divisible by 100, it is NOT a leap year,
    // UNLESS it is also divisible by 400.
    if (year % 100 !== 0) {
        // If divisible by 4 but not by 100 (e.g., 2004), it's a leap year.
        return true;
    }
    // At this point, the year is divisible by both 4 and 100 (e.g., 1900, 2000).
    // For such century years, it must also be divisible by 400 to be a leap year.
    return year % 400 === 0;
}
