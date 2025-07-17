"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArmstrongNumber = isArmstrongNumber;
function isArmstrongNumber(n) {
    const digits = n
        .toString()
        .split("")
        .map((digit) => Number(digit));
    const exponent = digits.length;
    const sum = digits.map(BigInt).reduce((acc, digit) => {
        return acc + Math.pow(digit, BigInt(exponent));
    }, BigInt(0));
    return sum === BigInt(n.toString());
}
