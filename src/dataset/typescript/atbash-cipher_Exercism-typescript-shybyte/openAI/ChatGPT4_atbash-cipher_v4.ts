const aCode = 97; // 'a'.charCodeAt(0)
const zCode = 122; // 'z'.charCodeAt(0)

const isNumber = (char: string) => char >= '0' && char <= '9';

const translate = (char: string) =>
    String.fromCharCode(zCode - (char.charCodeAt(0) - aCode));

export default class AtbashCipher {
    encode = (s: string) => {
        const result: string[] = [];
        let chunkSize = 0;

        for (const char of s.toLowerCase()) {
            if (char >= 'a' && char <= 'z') {
                result.push(translate(char));
                chunkSize++;
            } else if (isNumber(char)) {
                result.push(char);
                chunkSize++;
            }

            if (chunkSize === 5) {
                result.push(' ');
                chunkSize = 0;
            }
        }

        if (result[result.length - 1] === ' ') result.pop();
        return result.join('');
    };

    decode = (text: string): string => {
        return text
            .split('')
            .filter((c) => c !== ' ')
            .map((c) =>
                c >= 'a' && c <= 'z'
                    ? String.fromCharCode(zCode - c.charCodeAt(0) + aCode)
                    : isNumber(c)
                    ? c
                    : ''
            )
            .join('');
    };
}