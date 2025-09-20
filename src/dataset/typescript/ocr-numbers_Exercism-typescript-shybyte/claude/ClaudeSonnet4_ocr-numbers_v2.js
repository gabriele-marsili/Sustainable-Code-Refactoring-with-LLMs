"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DIGITS_PATTERNS = [
    ' _ | ||_|',
    '     |  |',
    ' _  _||_ ',
    ' _  _| _|',
    '   |_|  |',
    ' _ |_  _|',
    ' _ |_ |_|',
    ' _   |  |',
    ' _ |_||_|',
    ' _ |_| _|'
];
const PATTERN_MAP = new Map(DIGITS_PATTERNS.map((pattern, index) => [pattern, index.toString()]));
const convertDigit = (pattern) => { var _a; return (_a = PATTERN_MAP.get(pattern)) !== null && _a !== void 0 ? _a : '?'; };
const convertDigitRow = (gridRow) => {
    const lines = gridRow.split('\n', 3);
    const numberOfDigits = lines[0].length / 3;
    let result = '';
    for (let i = 0; i < numberOfDigits; i++) {
        const start = i * 3;
        const end = start + 3;
        const pattern = lines[0].slice(start, end) + lines[1].slice(start, end) + lines[2].slice(start, end);
        result += convertDigit(pattern);
    }
    return result;
};
const convert = (grid) => {
    const rows = grid.split(/\n +\n/);
    const results = new Array(rows.length);
    for (let i = 0; i < rows.length; i++) {
        results[i] = convertDigitRow(rows[i]);
    }
    return results.join(',');
};
exports.default = { convert };
