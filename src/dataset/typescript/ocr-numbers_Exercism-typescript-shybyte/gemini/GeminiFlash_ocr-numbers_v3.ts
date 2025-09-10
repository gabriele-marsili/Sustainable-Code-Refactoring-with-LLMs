const DIGITS_PATTERNS = [
    ' _ | ||_|',
    '   |  |',
    ' _ _||_ ',
    ' _ _||_|',
    '   |_|  |',
    ' _ |_ _|',
    ' _ |_|_|',
    ' _ |  |',
    ' _ |_||_|',
    ' _ |_| _|'
];

const DIGITS_MAP = new Map<string, string>();
for (let i = 0; i < DIGITS_PATTERNS.length; i++) {
    DIGITS_MAP.set(DIGITS_PATTERNS[i], i.toString());
}

const convertDigit = (pattern: string): string => {
    return DIGITS_MAP.get(pattern) || '?';
};

const convertDigitRow = (gridRow: string): string => {
    const lines = gridRow.split('\n');
    const numberOfDigits = lines[0].length / 3;
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

const convert = (grid: string): string => {
    return grid.split(/\n +\n/).map(convertDigitRow).join(',');
};

export default { convert };