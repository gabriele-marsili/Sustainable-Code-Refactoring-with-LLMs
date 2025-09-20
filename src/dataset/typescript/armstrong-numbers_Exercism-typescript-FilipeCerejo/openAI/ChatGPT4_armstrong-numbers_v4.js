"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArmstrongNumber = isArmstrongNumber;
function isArmstrongNumber(number) {
    const digits = number.toString();
    const length = digits.length;
    let sum = 0;
    for (let i = 0; i < length; i++) {
        const digit = digits.charCodeAt(i) - 48; // Faster than Number(digit)
        sum += Math.pow(digit, length);
        if (sum > number)
            return false; // Early exit for efficiency
    }
    return sum === number;
}
