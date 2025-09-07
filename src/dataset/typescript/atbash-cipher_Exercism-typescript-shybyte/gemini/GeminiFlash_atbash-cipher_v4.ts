const aCode = 'a'.charCodeAt(0);
const zCode = 'z'.charCodeAt(0);
const zeroCode = '0'.charCodeAt(0);
const nineCode = '9'.charCodeAt(0);

const translate = (charCode: number) =>
    String.fromCharCode(zCode - (charCode - aCode));

export default class AtbashCipher {
    private static readonly ENCODE_REPLACE_REGEX = /[^0-9a-z]/g;
    private static readonly ENCODE_CHUNK_REGEX = /.{1,5}/g;

    encode = (s: string) => {
        const cleaned = s.toLowerCase().replace(AtbashCipher.ENCODE_REPLACE_REGEX, '');
        let encoded = '';
        let count = 0;

        for (let i = 0; i < cleaned.length; i++) {
            const charCode = cleaned.charCodeAt(i);
            let translatedChar: string;

            if (charCode >= zeroCode && charCode <= nineCode) {
                translatedChar = cleaned[i];
            } else {
                translatedChar = translate(charCode);
            }

            encoded += translatedChar;
            count++;

            if (count === 5 && i < cleaned.length - 1) {
                encoded += ' ';
                count = 0;
            }
        }

        return encoded;
    };

    decode = (text: string): string => {
        let decoded = '';
        for (let i = 0; i < text.length; i++) {
            const charCode = text.charCodeAt(i);
            if (charCode >= aCode && charCode <= zCode) {
                decoded += String.fromCharCode(zCode - (charCode - aCode));
            } else if (charCode >= zeroCode && charCode <= nineCode) {
                decoded += text[i];
            }
        }
        return decoded;
    };
}