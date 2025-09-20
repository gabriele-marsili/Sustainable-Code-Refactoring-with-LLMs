"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleEverySecondDigit = (digit) => {
    const doubled = digit * 2;
    return doubled > 9 ? doubled - 9 : doubled;
};
class Luhn {
    static valid(input) {
        if (input.length < 2 || !/^\d[\d ]*\d$/.test(input)) {
            return false;
        }
        let sum = 0;
        let isSecond = false;
        for (let i = input.length - 1; i >= 0; i--) {
            const char = input[i];
            if (char === ' ')
                continue;
            const digit = +char;
            sum += isSecond ? handleEverySecondDigit(digit) : digit;
            isSecond = !isSecond;
        }
        return sum % 10 === 0;
    }
}
exports.default = Luhn;
