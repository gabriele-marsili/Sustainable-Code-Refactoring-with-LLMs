"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DIGITS_PATTERNS = new Map([
    [
        ' _ ' +
            '| |' +
            '|_|', '0'
    ],
    [
        '   ' +
            '  |' +
            '  |', '1'
    ],
    [
        ' _ ' +
            ' _|' +
            '|_ ', '2'
    ],
    [
        ' _ ' +
            ' _|' +
            ' _|', '3'
    ],
    [
        '   ' +
            '|_|' +
            '  |', '4'
    ],
    [
        ' _ ' +
            '|_ ' +
            ' _|', '5'
    ],
    [
        ' _ ' +
            '|_ ' +
            '|_|', '6'
    ],
    [
        ' _ ' +
            '  |' +
            '  |', '7'
    ],
    [
        ' _ ' +
            '|_|' +
            '|_|', '8'
    ],
    [
        ' _ ' +
            '|_|' +
            ' _|', '9'
    ]
]);
const convertDigit = (pattern) => {
    return DIGITS_PATTERNS.get(pattern) || '?';
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
            pattern += lines[j].slice(i * 3, (i + 1) * 3);
        }
        result += convertDigit(pattern);
    }
    return result;
};
const convert = (grid) => {
    return grid.split(/\n +\n/).map(convertDigitRow).join(',');
};
exports.default = { convert };
