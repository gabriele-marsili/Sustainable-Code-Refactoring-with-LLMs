const ALPHABET_LENGTH = 26;

function rotateChar(char: string, min: number, key: number) {
    const offset = char.charCodeAt(0) - min;
    return String.fromCharCode(((offset + key) % ALPHABET_LENGTH + ALPHABET_LENGTH) % ALPHABET_LENGTH + min);
}

function rotate(text: string, key: number) {
    return Array.from(text, (char) => {
        const code = char.charCodeAt(0);
        if (code >= 97 && code <= 122) {
            return rotateChar(char, 97, key);
        } else if (code >= 65 && code <= 90) {
            return rotateChar(char, 65, key);
        }
        return char;
    }).join('');
}

export default { rotate };