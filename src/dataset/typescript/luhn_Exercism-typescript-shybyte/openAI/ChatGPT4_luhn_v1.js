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
const handleEverySecondDigit = (digit) => (digit < 5 ? digit * 2 : digit * 2 - 9);
class Luhn {
    static valid(input) {
        let hasDigit = false;
        let checksum = 0;
        let isSecond = false;
        for (let i = input.length - 1; i >= 0; i--) {
            const char = input[i];
            if (char === ' ')
                continue;
            if (char < '0' || char > '9')
                return false;
            hasDigit = true;
            const digit = parseInt(char, 10);
            checksum += isSecond ? handleEverySecondDigit(digit) : digit;
            isSecond = !isSecond;
        }
        return hasDigit && checksum % 10 === 0;
    }
}
exports.default = Luhn;
