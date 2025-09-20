"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArmstrongNumbers {
    static isArmstrongNumber(x) {
        const str = x.toString();
        const numDigits = str.length;
        let sum = 0;
        for (let i = 0; i < numDigits; i++) {
            const digit = str.charCodeAt(i) - 48; // Convert char to number using ASCII
            sum += Math.pow(digit, numDigits);
        }
        return x === sum;
    }
}
exports.default = ArmstrongNumbers;
