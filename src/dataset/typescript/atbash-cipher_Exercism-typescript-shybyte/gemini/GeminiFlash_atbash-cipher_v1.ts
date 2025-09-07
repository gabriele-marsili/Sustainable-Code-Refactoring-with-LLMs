const aCode = 'a'.charCodeAt(0);
const zCode = 'z'.charCodeAt(0);

const translate = (charCode: number): string =>
    String.fromCharCode(zCode - (charCode - aCode));

export default class AtbashCipher {
    private static readonly chunkRegex = /.{1,5}/g;

    encode = (s: string): string => {
        let encoded = '';
        let count = 0;

        for (let i = 0; i < s.length; i++) {
            const char = s[i].toLowerCase();
            const charCode = char.charCodeAt(0);

            if (charCode >= 48 && charCode <= 57) { // isNumber
                encoded += char;
                count++;
            } else if (charCode >= aCode && charCode <= zCode) {
                encoded += translate(charCode);
                count++;
            }

            if (count === 5) {
                encoded += ' ';
                count = 0;
            }
        }

        return encoded.trim();
    };

    decode = (text: string): string => {
        let decoded = '';

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const charCode = char.charCodeAt(0);

            if (charCode >= aCode && charCode <= zCode) {
                decoded += String.fromCharCode(zCode - charCode + aCode);
            } else if (charCode >= 48 && charCode <= 57) { // isNumber
                decoded += char;
            }
        }

        return decoded;
    };
}