const DIGITS_PATTERNS = new Map<string, string>([
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

const convertDigit = (pattern: string): string => {
    return DIGITS_PATTERNS.get(pattern) || '?';
};

const convertDigitRow = (gridRow: string): string => {
    const lines = gridRow.split('\n').slice(0, 3);
    const numberOfDigits = lines[0].length / 3;
    let result = '';
    for (let i = 0; i < numberOfDigits; i++) {
        let pattern = '';
        for (const line of lines) {
            pattern += line.slice(i * 3, (i + 1) * 3);
        }
        result += convertDigit(pattern);
    }
    return result;
};

const convert = (grid: string): string => {
    return grid.split(/\n +\n/).map(convertDigitRow).join(',');
};

export default { convert };