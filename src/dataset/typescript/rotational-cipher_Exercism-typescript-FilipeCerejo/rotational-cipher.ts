export function rotate(sentence: string, shift: number): string {
    return sentence
        .split('')
        .map((s) => {
            if (/^[A-Z]$/.test(s)) {
                return String.fromCharCode(((s.charCodeAt(0) - 65 + shift) % 26) + 65);
            } else if (/^[a-z]$/.test(s)) {
                return String.fromCharCode(((s.charCodeAt(0) - 97 + shift) % 26) + 97);
            } else {
                return s;
            }
        })
        .join('');
}
