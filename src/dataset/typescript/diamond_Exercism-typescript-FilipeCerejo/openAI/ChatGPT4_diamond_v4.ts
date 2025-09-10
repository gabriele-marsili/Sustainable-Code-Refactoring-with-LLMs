const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function makeDiamond(character: string): string {
    const letterIdx = ALPHABET.indexOf(character);
    const size = letterIdx * 2 + 1;
    const diamond: string[] = new Array(size);

    for (let i = 0; i <= letterIdx; i++) {
        const line = ' '.repeat(size).split('');
        line[letterIdx - i] = ALPHABET[i];
        line[letterIdx + i] = ALPHABET[i];
        const lineStr = line.join('');
        diamond[letterIdx - i] = lineStr;
        diamond[letterIdx + i] = lineStr;
    }

    return diamond.join('\n') + '\n';
}