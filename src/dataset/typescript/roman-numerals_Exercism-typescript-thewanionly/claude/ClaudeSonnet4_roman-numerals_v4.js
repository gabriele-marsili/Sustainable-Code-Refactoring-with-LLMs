"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRoman = void 0;
const indexMultiplier = [1, 10, 100, 1000];
const RomanNumeral = {
    1: 'I',
    5: 'V',
    10: 'X',
    50: 'L',
    100: 'C',
    500: 'D',
    1000: 'M'
};
const toRoman = (num) => {
    let result = '';
    let remaining = num;
    for (let i = 3; i >= 0; i--) {
        const multiplier = indexMultiplier[i];
        const digit = Math.floor(remaining / multiplier);
        if (digit === 0)
            continue;
        remaining %= multiplier;
        if (RomanNumeral[digit * multiplier]) {
            result += RomanNumeral[digit * multiplier];
        }
        else if (digit === 4 || digit === 9) {
            result += RomanNumeral[multiplier] + RomanNumeral[(digit + 1) * multiplier];
        }
        else if (digit >= 1 && digit <= 3) {
            result += RomanNumeral[multiplier].repeat(digit);
        }
        else if (digit >= 6 && digit <= 8) {
            result += RomanNumeral[5 * multiplier] + RomanNumeral[multiplier].repeat(digit - 5);
        }
    }
    return result;
};
exports.toRoman = toRoman;
