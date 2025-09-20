"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArmstrongNumbers {
    static isArmstrongNumber(x) {
        const digits = x.toString();
        const length = digits.length;
        let sum = 0;
        for (let i = 0; i < length; i++) {
            const digit = Number(digits[i]);
            sum += Math.pow(digit, length);
            if (sum > x)
                return false; // Early exit if sum exceeds x
        }
        return sum === x;
    }
}
exports.default = ArmstrongNumbers;
