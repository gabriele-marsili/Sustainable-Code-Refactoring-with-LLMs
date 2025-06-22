const DIGITS_PATTERNS = [
    ' _ ' +
    '| |' +
    '|_|'
    ,
    '   ' +
    '  |' +
    '  |'
    ,
    ' _ ' +
    ' _|' +
    '|_ '
    ,
    ' _ ' +
    ' _|' +
    ' _|'
    ,
    '   ' +
    '|_|' +
    '  |'
    ,
    ' _ ' +
    '|_ ' +
    ' _|'
    ,
    ' _ ' +
    '|_ ' +
    '|_|'
    ,
    ' _ ' +
    '  |' +
    '  |'
    ,
    ' _ ' +
    '|_|' +
    '|_|'
    ,
    ' _ ' +
    '|_|' +
    ' _|'
]

const convertDigit = (pattern: string) =>
    DIGITS_PATTERNS.indexOf(pattern) >= 0 ? DIGITS_PATTERNS.indexOf(pattern).toString() : '?'

const convertDigitRow = (gridRow: string) => {
    const lines = gridRow.split('\n').slice(0, 3)
    const numberOfDigits = lines[0].length / 3
    const digitPatterns = Array.from({length: numberOfDigits},
        (_, i) => lines.map((line) => line.slice(i * 3, (i + 1) * 3)).join('')
    )
    return digitPatterns.map(convertDigit).join('')
}

const convert = (grid: string) =>
    grid.split(/\n +\n/).map(convertDigitRow).join(',')

export default {convert}
