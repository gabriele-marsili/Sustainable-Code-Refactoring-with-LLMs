"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toReversedDigits = (n) => {
    const digits = [];
    for (let i = n.length - 1; i >= 0; i--) {
        const char = n[i];
        if (char !== ' ') {
            digits.push(parseInt(char, 10));
        }
    }
    return digits;
};
const handleEverySecondDigit = (digit) => {
    const doubled = digit * 2;
    return doubled - (doubled > 9 ? 9 : 0);
};
class Luhn {
    static valid(input) {
        if (!/^\d[\d ]+$/.test(input)) {
            return false;
        }
        let checksum = 0;
        let isSecond = false;
        for (let i = input.length - 1; i >= 0; i--) {
            const char = input[i];
            if (char === ' ')
                continue;
            const digit = parseInt(char, 10);
            checksum += isSecond ? handleEverySecondDigit(digit) : digit;
            isSecond = !isSecond;
        }
        return checksum % 10 === 0;
    }
}
exports.default = Luhn;
