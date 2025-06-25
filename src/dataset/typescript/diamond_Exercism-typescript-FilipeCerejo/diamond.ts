const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function makeDiamond(character: string): string {
    let letterIdx = ALPHABET.indexOf(character);
    let size = letterIdx * 2 + 1;
    let diamond: string[] = [];

    for (let i = letterIdx; i >= 0; i--) {
        let line = Array.from(Array(size), (v: unknown, k: number) => {
            if (k === letterIdx - i || k === letterIdx + i) return ALPHABET[i];
            return ' ';
        }).join('');

        diamond.push(line);
        if (i < letterIdx) diamond.unshift(line);
    }

    return diamond.join('\n') + '\n';
}
