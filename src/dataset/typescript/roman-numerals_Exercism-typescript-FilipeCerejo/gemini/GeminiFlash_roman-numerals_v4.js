"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRoman = void 0;
const ROMAN_MAP = {
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
const DECIMAL_VALUES = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
const toRoman = (decimal) => {
    if (decimal <= 0 || decimal > 3999) {
        return '';
    }
    let roman = '';
    let remaining = decimal;
    for (const value of DECIMAL_VALUES) {
        while (remaining >= value) {
            roman += ROMAN_MAP[value];
            remaining -= value;
        }
    }
    return roman;
};
exports.toRoman = toRoman;
