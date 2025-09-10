const codeA = 'A'.charCodeAt(0);

export default class Diamond {
    makeDiamond(maxChar: string) {
        const maxCharCode = maxChar.charCodeAt(0);
        const charIndex = maxCharCode - codeA;
        const size = charIndex * 2 + 1;
        const lines: string[] = Array(size).fill('');

        for (let y = 0; y <= charIndex; y++) {
            const currentLetter = String.fromCharCode(codeA + y);
            const padding = ' '.repeat(charIndex - y);
            const line = padding + currentLetter + (y > 0 ? ' '.repeat(y * 2 - 1) + currentLetter : '') + padding;
            lines[y] = line;
            lines[size - y - 1] = line;
        }

        return lines.join('\n') + '\n';
    }
}