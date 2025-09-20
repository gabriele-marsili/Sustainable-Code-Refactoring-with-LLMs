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
    let position = 0;
    while (num > 0) {
        const digit = num % 10;
        num = Math.floor(num / 10);
        if (digit > 0) {
            const multiplier = indexMultiplier[position];
            let digitRoman = '';
            // Direct lookup for exact matches
            if (RomanNumeral[digit * multiplier]) {
                digitRoman = RomanNumeral[digit * multiplier];
            }
            // Handle 4 and 9
            else if (digit === 4 || digit === 9) {
                digitRoman = RomanNumeral[multiplier] + RomanNumeral[(digit + 1) * multiplier];
            }
            // Handle 1, 2, 3
            else if (digit <= 3) {
                digitRoman = RomanNumeral[multiplier].repeat(digit);
            }
            // Handle 6, 7, 8
            else {
                digitRoman = RomanNumeral[5 * multiplier] + RomanNumeral[multiplier].repeat(digit - 5);
            }
            result = digitRoman + result;
        }
        position++;
    }
    return result;
};
exports.toRoman = toRoman;
