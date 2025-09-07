export function rotate(sentence: string, shift: number): string {
    const A_CODE = 65, Z_CODE = 90, a_CODE = 97, z_CODE = 122;
    const shiftChar = (char: string, base: number): string =>
        String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26 + 26) % 26 + base);

    return Array.from(sentence, (char) => {
        const code = char.charCodeAt(0);
        if (code >= A_CODE && code <= Z_CODE) {
            return shiftChar(char, A_CODE);
        } else if (code >= a_CODE && code <= z_CODE) {
            return shiftChar(char, a_CODE);
        }
        return char;
    }).join('');
}