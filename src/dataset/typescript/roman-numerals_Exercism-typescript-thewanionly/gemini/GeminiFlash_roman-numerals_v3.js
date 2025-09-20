"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRoman = void 0;
const RomanNumeralValues = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
];
const toRoman = (num) => {
    let result = '';
    let remaining = num;
    for (const [value, numeral] of RomanNumeralValues) {
        while (remaining >= value) {
            result += numeral;
            remaining -= value;
        }
    }
    return result;
};
exports.toRoman = toRoman;
