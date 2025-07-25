"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRoman = void 0;
const toRoman = (decimal) => {
    let stringed = Array.from(String(decimal)).reverse();
    let units = stringed[0] ? Number(stringed[0]) : 0;
    let dozens = stringed[1] ? Number(stringed[1]) : 0;
    let cents = stringed[2] ? Number(stringed[2]) : 0;
    let thousands = stringed[3] ? Number(stringed[3]) : 0;
    let roman = '';
    roman += 'M'.repeat(thousands);
    roman += digitLetters('C', 'D', 'M', cents);
    roman += digitLetters('X', 'L', 'C', dozens);
    roman += digitLetters('I', 'V', 'X', units);
    return roman;
};
exports.toRoman = toRoman;
function digitLetters(minor, middle, major, value) {
    let roman = '';
    if (value === 9) {
        roman += minor + major;
    }
    else if (value > 5) {
        roman += middle + minor.repeat(value - 5);
    }
    else if (value === 5) {
        roman += middle;
    }
    else if (value === 4) {
        roman += minor + middle;
    }
    else {
        roman += minor.repeat(value);
    }
    return roman;
}
