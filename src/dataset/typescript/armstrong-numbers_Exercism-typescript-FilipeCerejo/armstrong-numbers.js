"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArmstrongNumber = isArmstrongNumber;
function isArmstrongNumber(number) {
    let strNumber = number.toString();
    let sum = 0;
    strNumber.split('').forEach((digit) => {
        sum += Math.pow(Number(digit), strNumber.length);
    });
    return sum === number;
}
