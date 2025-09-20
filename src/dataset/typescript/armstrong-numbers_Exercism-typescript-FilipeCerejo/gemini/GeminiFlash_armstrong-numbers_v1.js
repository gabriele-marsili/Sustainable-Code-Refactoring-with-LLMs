"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArmstrongNumber = isArmstrongNumber;
function isArmstrongNumber(number) {
    const strNumber = number.toString();
    const numDigits = strNumber.length;
    let sum = 0;
    for (let i = 0; i < numDigits; i++) {
        const digit = parseInt(strNumber[i], 10);
        sum += Math.pow(digit, numDigits);
    }
    return sum === number;
}
