export function rotate(sentence: string, shift: number): string {
    let result = "";
    const len = sentence.length;
    const shiftMod26 = shift % 26;

    for (let i = 0; i < len; i++) {
        const charCode = sentence.charCodeAt(i);

        if (charCode >= 65 && charCode <= 90) {
            result += String.fromCharCode(((charCode - 65 + shiftMod26 + 26) % 26) + 65);
        } else if (charCode >= 97 && charCode <= 122) {
            result += String.fromCharCode(((charCode - 97 + shiftMod26 + 26) % 26) + 97);
        } else {
            result += sentence[i];
        }
    }

    return result;
}