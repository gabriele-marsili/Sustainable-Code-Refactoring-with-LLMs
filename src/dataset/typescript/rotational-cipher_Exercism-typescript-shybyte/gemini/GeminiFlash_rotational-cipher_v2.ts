const ALPHABET_LENGTH = 26;

function rotate(text: string, key: number) {
    let result = "";
    const len = text.length;
    const keyMod = key % ALPHABET_LENGTH;

    for (let i = 0; i < len; i++) {
        const charCode = text.charCodeAt(i);

        if (charCode >= 97 && charCode <= 122) {
            result += String.fromCharCode(((charCode - 97 + keyMod) % ALPHABET_LENGTH) + 97);
        } else if (charCode >= 65 && charCode <= 90) {
            result += String.fromCharCode(((charCode - 65 + keyMod) % ALPHABET_LENGTH) + 65);
        } else {
            result += text[i];
        }
    }

    return result;
}

export default { rotate };