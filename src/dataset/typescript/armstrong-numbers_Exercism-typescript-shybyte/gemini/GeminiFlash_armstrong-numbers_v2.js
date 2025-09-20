"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArmstrongNumbers {
    static isArmstrongNumber(x) {
        const numStr = x.toString();
        const numDigits = numStr.length;
        let sum = 0;
        for (let i = 0; i < numDigits; i++) {
            const digit = parseInt(numStr[i], 10);
            sum += Math.pow(digit, numDigits);
        }
        return x === sum;
    }
}
exports.default = ArmstrongNumbers;
