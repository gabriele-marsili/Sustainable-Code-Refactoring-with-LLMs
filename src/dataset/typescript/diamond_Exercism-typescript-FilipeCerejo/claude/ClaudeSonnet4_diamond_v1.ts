const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function makeDiamond(character: string): string {
    const letterIdx = ALPHABET.indexOf(character);
    const size = letterIdx * 2 + 1;
    const lines: string[] = [];
    
    // Build only the top half + middle, then mirror
    for (let i = 0; i <= letterIdx; i++) {
        const spaces = letterIdx - i;
        const letter = ALPHABET[i];
        
        let line: string;
        if (i === 0) {
            line = ' '.repeat(spaces) + letter + ' '.repeat(spaces);
        } else {
            const innerSpaces = i * 2 - 1;
            line = ' '.repeat(spaces) + letter + ' '.repeat(innerSpaces) + letter + ' '.repeat(spaces);
        }
        
        lines.push(line);
    }
    
    // Mirror the top half to create bottom half
    for (let i = letterIdx - 1; i >= 0; i--) {
        lines.push(lines[i]);
    }
    
    return lines.join('\n') + '\n';
}