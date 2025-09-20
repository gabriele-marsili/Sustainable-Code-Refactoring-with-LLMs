"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArmstrongNumber = isArmstrongNumber;
function isArmstrongNumber(number) {
    const strNumber = number.toString();
    const length = strNumber.length;
    let sum = 0;
    for (let i = 0; i < length; i++) {
        const digit = strNumber.charCodeAt(i) - 48; // Using charCodeAt for efficient digit conversion
        sum += Math.pow(digit, length);
        if (sum > number)
            return false; // Early exit if sum exceeds the number
    }
    return sum === number;
}
