const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function makeDiamond(character: string): string {
    const letterIdx = ALPHABET.indexOf(character);
    const size = letterIdx * 2 + 1;
    const middle = letterIdx;
    let diamond = '';

    for (let i = 0; i <= letterIdx; i++) {
        let line = '';
        for (let j = 0; j < size; j++) {
            if (j === middle - i || j === middle + i) {
                line += ALPHABET[i];
            } else {
                line += ' ';
            }
        }
        diamond += line + '\n';
    }

    for (let i = letterIdx - 1; i >= 0; i--) {
        let line = '';
        for (let j = 0; j < size; j++) {
            if (j === middle - i || j === middle + i) {
                line += ALPHABET[i];
            } else {
                line += ' ';
            }
        }
        diamond += line + '\n';
    }

    return diamond;
}