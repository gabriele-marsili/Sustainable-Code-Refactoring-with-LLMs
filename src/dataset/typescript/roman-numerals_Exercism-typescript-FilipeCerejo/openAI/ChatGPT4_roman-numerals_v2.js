"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRoman = void 0;
const toRoman = (decimal) => {
    const romanNumerals = [
        ['I', 'V', 'X'], // Units
        ['X', 'L', 'C'], // Dozens
        ['C', 'D', 'M'], // Hundreds
        ['M', '', ''], // Thousands
    ];
    let roman = '';
    let place = 0;
    while (decimal > 0) {
        const value = decimal % 10;
        const [minor, middle, major] = romanNumerals[place];
        roman = digitLetters(minor, middle, major, value) + roman;
        decimal = Math.floor(decimal / 10);
        place++;
    }
    return roman;
};
exports.toRoman = toRoman;
function digitLetters(minor, middle, major, value) {
    if (value === 9)
        return minor + major;
    if (value >= 5)
        return middle + minor.repeat(value - 5);
    if (value === 4)
        return minor + middle;
    return minor.repeat(value);
}
