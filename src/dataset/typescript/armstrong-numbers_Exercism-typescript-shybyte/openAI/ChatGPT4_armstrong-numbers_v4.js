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
        const str = x.toString();
        const len = str.length;
        let sum = 0;
        for (let i = 0; i < len; i++) {
            const digit = str.charCodeAt(i) - 48; // Faster than parseInt
            sum += Math.pow(digit, len);
            if (sum > x)
                return false; // Early exit for efficiency
        }
        return sum === x;
    }
}
exports.default = ArmstrongNumbers;
