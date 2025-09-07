const aCode = 97; // 'a'.charCodeAt(0)
const zCode = 122; // 'z'.charCodeAt(0)

const isNumber = (char: string) => char >= '0' && char <= '9';

const translate = (char: string) =>
    String.fromCharCode(zCode - (char.charCodeAt(0) - aCode));

export default class AtbashCipher {
    encode(s: string): string {
        let result = '';
        let count = 0;

        for (const char of s.toLowerCase()) {
            if (char >= 'a' && char <= 'z') {
                result += translate(char);
                count++;
            } else if (isNumber(char)) {
                result += char;
                count++;
            }

            if (count === 5) {
                result += ' ';
                count = 0;
            }
        }

        return result.trim();
    }

    decode(text: string): string {
        let result = '';

        for (const char of text) {
            if (char >= 'a' && char <= 'z') {
                result += String.fromCharCode(zCode - (char.charCodeAt(0) - aCode));
            } else if (isNumber(char)) {
                result += char;
            }
        }

        return result;
    }
}