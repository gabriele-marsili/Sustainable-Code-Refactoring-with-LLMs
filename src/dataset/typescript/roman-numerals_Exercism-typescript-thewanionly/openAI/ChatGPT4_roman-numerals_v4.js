"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRoman = void 0;
const indexMultiplier = [1, 10, 100, 1000];
const RomanNumeral = {
    1: 'I',
    4: 'IV',
    5: 'V',
    9: 'IX',
    10: 'X',
    40: 'XL',
    50: 'L',
    90: 'XC',
    100: 'C',
    400: 'CD',
    500: 'D',
    900: 'CM',
    1000: 'M',
};
const toRoman = (num) => {
    const romanStr = [];
    let remaining = num;
    for (let i = indexMultiplier.length - 1; i >= 0; i--) {
        const multiplier = indexMultiplier[i];
        const digit = Math.floor(remaining / multiplier);
        remaining %= multiplier;
        if (digit === 0)
            continue;
        if (RomanNumeral[digit * multiplier]) {
            romanStr.push(RomanNumeral[digit * multiplier]);
        }
        else {
            if (digit >= 5) {
                romanStr.push(RomanNumeral[5 * multiplier]);
                romanStr.push(RomanNumeral[multiplier].repeat(digit - 5));
            }
            else {
                romanStr.push(RomanNumeral[multiplier].repeat(digit));
            }
        }
    }
    return romanStr.join('');
};
exports.toRoman = toRoman;
