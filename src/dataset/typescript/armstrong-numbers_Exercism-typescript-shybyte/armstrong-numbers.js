"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sum(numbers) {
    return numbers.reduce((x, y) => x + y, 0);
}
class ArmstrongNumbers {
    static isArmstrongNumber(x) {
        const digits = [...x.toString()].map((char) => parseInt(char, 10));
        return x === sum(digits.map((d) => Math.pow(d, digits.length)));
    }
}
exports.default = ArmstrongNumbers;
