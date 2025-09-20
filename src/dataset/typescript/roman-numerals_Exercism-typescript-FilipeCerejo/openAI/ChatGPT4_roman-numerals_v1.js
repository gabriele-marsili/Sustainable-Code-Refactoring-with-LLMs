"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRoman = void 0;
const toRoman = (decimal) => {
    const stringed = String(decimal);
    const len = stringed.length;
    let roman = '';
    if (len > 3)
        roman += 'M'.repeat(Number(stringed[len - 4]));
    if (len > 2)
        roman += digitLetters('C', 'D', 'M', Number(stringed[len - 3]));
    if (len > 1)
        roman += digitLetters('X', 'L', 'C', Number(stringed[len - 2]));
    roman += digitLetters('I', 'V', 'X', Number(stringed[len - 1]));
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
