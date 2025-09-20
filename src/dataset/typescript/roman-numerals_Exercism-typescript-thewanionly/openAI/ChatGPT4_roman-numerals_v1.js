"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRoman = void 0;
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
    1000: 'M'
};
const toRoman = (num) => {
    const romanStr = [];
    const keys = Object.keys(RomanNumeral)
        .map(Number)
        .reverse();
    for (const key of keys) {
        while (num >= key) {
            romanStr.push(RomanNumeral[key]);
            num -= key;
        }
    }
    return romanStr.join('');
};
exports.toRoman = toRoman;
