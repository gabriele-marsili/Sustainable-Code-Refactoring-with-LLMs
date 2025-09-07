const ALPHABET_LENGTH = 26;

function rotateChar(char: string, min: number, key: number): string {
    const charCode = char.charCodeAt(0);
    const rotatedCharCode = ((charCode - min + key) % ALPHABET_LENGTH + ALPHABET_LENGTH) % ALPHABET_LENGTH + min;
    return String.fromCharCode(rotatedCharCode);
}

function rotate(text: string, key: number): string {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const charCode = char.charCodeAt(0);

        if (charCode >= 97 && charCode <= 122) {
            result += rotateChar(char, 'a'.charCodeAt(0), key);
        } else if (charCode >= 65 && charCode <= 90) {
            result += rotateChar(char, 'A'.charCodeAt(0), key);
        } else {
            result += char;
        }
    }
    return result;
}

export default { rotate };