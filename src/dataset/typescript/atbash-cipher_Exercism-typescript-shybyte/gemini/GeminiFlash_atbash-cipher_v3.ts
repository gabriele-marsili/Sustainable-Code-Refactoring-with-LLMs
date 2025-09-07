const aCode = 'a'.charCodeAt(0);
const zCode = 'z'.charCodeAt(0);
const zeroCode = '0'.charCodeAt(0);
const nineCode = '9'.charCodeAt(0);
const space = ' ';

const translateChar = (char: string): string => {
    const charCode = char.charCodeAt(0);
    return String.fromCharCode(zCode - (charCode - aCode));
};

const isLowerAlpha = (charCode: number): boolean => charCode >= aCode && charCode <= zCode;
const isDigit = (charCode: number): boolean => charCode >= zeroCode && charCode <= nineCode;

export default class AtbashCipher {
    encode = (s: string): string => {
        let encoded = '';
        let count = 0;

        for (let i = 0; i < s.length; i++) {
            const char = s[i].toLowerCase();
            const charCode = char.charCodeAt(0);

            if (isLowerAlpha(charCode) || isDigit(charCode)) {
                let translatedChar: string;
                if (isDigit(charCode)) {
                    translatedChar = char;
                } else {
                    translatedChar = translateChar(char);
                }

                encoded += translatedChar;
                count++;

                if (count % 5 === 0) {
                    encoded += space;
                }
            }
        }

        return encoded.trim();
    };

    decode = (text: string): string => {
        let decoded = '';

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const charCode = char.charCodeAt(0);

            if (isLowerAlpha(charCode)) {
                decoded += String.fromCharCode(zCode - charCode + aCode);
            } else if (isDigit(charCode)) {
                decoded += char;
            }
        }

        return decoded;
    };
}