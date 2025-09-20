"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArmstrongNumbers {
    static isArmstrongNumber(num) {
        const numStr = num.toString();
        const numDigits = numStr.length;
        let sum = 0;
        for (let i = 0; i < numDigits; i++) {
            const digit = numStr.charCodeAt(i) - 48; // Convert char to number without parsing
            sum += Math.pow(digit, numDigits);
        }
        return sum === num;
    }
}
exports.default = ArmstrongNumbers;
