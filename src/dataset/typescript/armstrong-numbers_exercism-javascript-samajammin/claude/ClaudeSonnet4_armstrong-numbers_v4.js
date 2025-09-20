"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArmstrongNumbers {
    static isArmstrongNumber(num) {
        if (num < 0)
            return false;
        if (num < 10)
            return true;
        const numStr = num.toString();
        const length = numStr.length;
        let sum = 0;
        for (let i = 0; i < length; i++) {
            const digit = numStr.charCodeAt(i) - 48;
            sum += Math.pow(digit, length);
            if (sum > num)
                return false;
        }
        return sum === num;
    }
}
exports.default = ArmstrongNumbers;
