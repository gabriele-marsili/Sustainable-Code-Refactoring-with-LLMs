"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isLeapYear(year) {
    // The current implementation is already highly optimized for clarity,
    // execution speed, and resource usage, directly reflecting the
    // Gregorian calendar leap year rule with efficient integer arithmetic
    // and short-circuiting boolean logic.
    // Further micro-optimizations (e.g., bitwise operations for modulo 4)
    // are unlikely to yield measurable performance or energy benefits on
    // modern JavaScript engines and could reduce readability.
    return year % 4 === 0 &&
        (year % 100 !== 0 || year % 400 === 0);
}
exports.default = isLeapYear;
