export function rotate(sentence: string, shift: number): string {
    const shiftChar = (char: string, base: number): string =>
        String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26 + 26) % 26 + base);

    return Array.from(sentence, (char) => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) return shiftChar(char, 65);
        if (code >= 97 && code <= 122) return shiftChar(char, 97);
        return char;
    }).join('');
}