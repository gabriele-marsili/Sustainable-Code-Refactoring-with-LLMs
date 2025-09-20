"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sum(numbers) {
    let total = 0;
    for (const num of numbers) {
        total += num;
    }
    return total;
}
class ArmstrongNumbers {
    static isArmstrongNumber(x) {
        const digits = x.toString();
        const length = digits.length;
        let armstrongSum = 0;
        for (let i = 0; i < length; i++) {
            const digit = digits.charCodeAt(i) - 48; // Faster than parseInt
            armstrongSum += Math.pow(digit, length);
            if (armstrongSum > x)
                return false; // Early exit if sum exceeds x
        }
        return armstrongSum === x;
    }
}
exports.default = ArmstrongNumbers;
