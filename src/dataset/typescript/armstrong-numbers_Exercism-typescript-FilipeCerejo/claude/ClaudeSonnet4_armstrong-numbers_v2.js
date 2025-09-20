"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArmstrongNumber = isArmstrongNumber;
function isArmstrongNumber(number) {
    let temp = number;
    let digitCount = 0;
    let sum = 0;
    // Count digits
    while (temp > 0) {
        digitCount++;
        temp = Math.floor(temp / 10);
    }
    temp = number;
    // Calculate sum of powers
    while (temp > 0) {
        const digit = temp % 10;
        sum += Math.pow(digit, digitCount);
        temp = Math.floor(temp / 10);
    }
    return sum === number;
}
