"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DIGITS_PATTERNS = [
    ' _ | ||_|', // 0
    '     |  |', // 1
    ' _  _||_ ', // 2
    ' _  _| _|', // 3
    '   |_|  |', // 4
    ' _ |_  _|', // 5
    ' _ |_ |_|', // 6
    ' _   |  |', // 7
    ' _ |_|_|', // 8
    ' _ |_| _|' // 9
];
const convertDigit = (pattern) => {
    const index = DIGITS_PATTERNS.indexOf(pattern);
    return index !== -1 ? index.toString() : '?';
};
const convertDigitRow = (gridRow) => {
    const lines = gridRow.split('\n');
    const numberOfDigits = Math.floor(lines[0].length / 3);
    let result = '';
    for (let i = 0; i < numberOfDigits; i++) {
        const pattern = lines[0].slice(i * 3, i * 3 + 3) +
            lines[1].slice(i * 3, i * 3 + 3) +
            lines[2].slice(i * 3, i * 3 + 3);
        result += convertDigit(pattern);
    }
    return result;
};
const convert = (grid) => grid.split(/\n\s*\n/).map(convertDigitRow).join(',');
exports.default = { convert };
