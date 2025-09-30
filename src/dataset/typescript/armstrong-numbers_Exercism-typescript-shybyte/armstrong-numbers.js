"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sum(numbers) {
    let total = 0;
    for (let i = 0; i < numbers.length; i++) {
        total += numbers[i];
    }
    return total;
}
class ArmstrongNumbers {
    static isArmstrongNumber(x) {
        const numStr = x.toString();
        const numDigits = numStr.length;
        let armstrongSum = 0;
        for (let i = 0; i < numDigits; i++) {
            const digit = parseInt(numStr[i], 10);
            armstrongSum += Math.pow(digit, numDigits);
        }
        return x === armstrongSum;
    }
}
exports.default = ArmstrongNumbers;
