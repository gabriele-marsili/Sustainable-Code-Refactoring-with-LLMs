"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DIGITS_PATTERNS = [
    ' _ | ||_|',
    '   |  |  ',
    ' _ _| |_ ',
    ' _ _| _| ',
    '   |_|  |',
    ' _ |_  _|',
    ' _ |_ |_|',
    ' _   |  |',
    ' _ |_||_|',
    ' _ |_| _|'
];
const DIGITS_MAP = new Map();
for (let i = 0; i < DIGITS_PATTERNS.length; i++) {
    DIGITS_MAP.set(DIGITS_PATTERNS[i], i.toString());
}
const convertDigit = (pattern) => {
    return DIGITS_MAP.get(pattern) || '?';
};
const convertDigitRow = (gridRow) => {
    const lines = gridRow.split('\n');
    if (lines.length < 3)
        return '';
    const numberOfDigits = lines[0].length / 3;
    if (lines[0].length % 3 !== 0)
        return '';
    let result = '';
    for (let i = 0; i < numberOfDigits; i++) {
        let pattern = '';
        for (let j = 0; j < 3; j++) {
            pattern += lines[j].substring(i * 3, (i + 1) * 3);
        }
        result += convertDigit(pattern);
    }
    return result;
};
const convert = (grid) => {
    return grid.split(/\n +\n/).map(convertDigitRow).join(',');
};
exports.default = { convert };
