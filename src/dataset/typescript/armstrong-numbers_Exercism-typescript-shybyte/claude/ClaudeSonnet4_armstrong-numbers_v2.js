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
        const str = x.toString();
        const length = str.length;
        let sum = 0;
        for (let i = 0; i < length; i++) {
            const digit = str.charCodeAt(i) - 48; // Convert char to number directly
            sum += Math.pow(digit, length);
        }
        return x === sum;
    }
}
exports.default = ArmstrongNumbers;
