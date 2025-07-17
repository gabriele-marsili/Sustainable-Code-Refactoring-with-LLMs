"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArmstrongNumbers {
    static isArmstrongNumber(num) {
        const digitArr = num
            .toString()
            .split('')
            .map(str => Number(str));
        const result = digitArr.reduce((result, digit) => {
            return result + Math.pow(digit, digitArr.length);
        }, 0);
        return result === num;
    }
}
exports.default = ArmstrongNumbers;
