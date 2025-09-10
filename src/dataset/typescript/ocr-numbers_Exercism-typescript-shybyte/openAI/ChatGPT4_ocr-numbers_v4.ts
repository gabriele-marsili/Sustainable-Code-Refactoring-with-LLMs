const DIGITS_PATTERNS = [
    ' _ | ||_|', '     |  |', ' _  _||_ ', ' _  _| _|', 
    '   |_|  |', ' _ |_  _|', ' _ |_ |_|', ' _   |  |', 
    ' _ |_|_|', ' _ |_| _|'
];

const convertDigit = (pattern: string): string => {
    const index = DIGITS_PATTERNS.indexOf(pattern);
    return index !== -1 ? index.toString() : '?';
};

const convertDigitRow = (gridRow: string): string => {
    const lines = gridRow.split('\n');
    const numberOfDigits = lines[0].length / 3;
    let result = '';
    for (let i = 0; i < numberOfDigits; i++) {
        const pattern = lines[0].slice(i * 3, i * 3 + 3) +
                        lines[1].slice(i * 3, i * 3 + 3) +
                        lines[2].slice(i * 3, i * 3 + 3);
        result += convertDigit(pattern);
    }
    return result;
};

const convert = (grid: string): string =>
    grid.split(/\n +\n/).map(convertDigitRow).join(',');

export default { convert };