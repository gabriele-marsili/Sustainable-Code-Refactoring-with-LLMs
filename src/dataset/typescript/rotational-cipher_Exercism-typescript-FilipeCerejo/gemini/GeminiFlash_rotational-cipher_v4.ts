export function rotate(sentence: string, shift: number): string {
    let result = "";
    const len = sentence.length;
    const shiftMod = shift % 26;

    for (let i = 0; i < len; i++) {
        const char = sentence.charCodeAt(i);

        if (char >= 65 && char <= 90) {
            result += String.fromCharCode(((char - 65 + shiftMod + 26) % 26) + 65);
        } else if (char >= 97 && char <= 122) {
            result += String.fromCharCode(((char - 97 + shiftMod + 26) % 26) + 97);
        } else {
            result += sentence[i];
        }
    }

    return result;
}