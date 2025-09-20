"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArmstrongNumber = isArmstrongNumber;
function isArmstrongNumber(number) {
    if (number < 0)
        return false;
    if (number < 10)
        return true;
    let temp = number;
    let digitCount = 0;
    while (temp > 0) {
        digitCount++;
        temp = Math.floor(temp / 10);
    }
    temp = number;
    let sum = 0;
    while (temp > 0) {
        const digit = temp % 10;
        sum += Math.pow(digit, digitCount);
        temp = Math.floor(temp / 10);
    }
    return sum === number;
}
