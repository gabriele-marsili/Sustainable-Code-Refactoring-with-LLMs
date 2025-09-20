"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRoman = void 0;
const toRoman = (decimal) => {
    const thousands = Math.floor(decimal / 1000);
    const cents = Math.floor((decimal % 1000) / 100);
    const dozens = Math.floor((decimal % 100) / 10);
    const units = decimal % 10;
    return 'M'.repeat(thousands) +
        digitLetters('C', 'D', 'M', cents) +
        digitLetters('X', 'L', 'C', dozens) +
        digitLetters('I', 'V', 'X', units);
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
