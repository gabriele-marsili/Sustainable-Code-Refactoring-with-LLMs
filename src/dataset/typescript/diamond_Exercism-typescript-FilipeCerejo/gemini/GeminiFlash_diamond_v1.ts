const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function makeDiamond(character: string): string {
    const letterIdx = ALPHABET.indexOf(character);
    const size = letterIdx * 2 + 1;
    const diamond: string[] = new Array(size);

    for (let i = 0; i <= letterIdx; i++) {
        const currentChar = ALPHABET[i];
        let line = '';
        const padding = letterIdx - i;

        if (i === 0) {
            line = ' '.repeat(padding) + currentChar + ' '.repeat(padding);
        } else {
            line = ' '.repeat(padding) + currentChar + ' '.repeat(2 * i - 1) + currentChar + ' '.repeat(padding);
        }

        diamond[i] = line;
        diamond[size - 1 - i] = line;
    }

    return diamond.join('\n') + '\n';
}