const aCode = 97; // 'a'.charCodeAt(0)
const zCode = 122; // 'z'.charCodeAt(0)

const isDigit = (code: number) => code >= 48 && code <= 57; // 0-9
const isLowercase = (code: number) => code >= 97 && code <= 122; // a-z

export default class AtbashCipher {
    encode = (s: string) => {
        let result = '';
        let count = 0;
        
        for (let i = 0; i < s.length; i++) {
            const code = s.charCodeAt(i);
            
            if (isDigit(code)) {
                if (count === 5) {
                    result += ' ';
                    count = 0;
                }
                result += s[i];
                count++;
            } else if (isLowercase(code)) {
                if (count === 5) {
                    result += ' ';
                    count = 0;
                }
                result += String.fromCharCode(zCode - (code - aCode));
                count++;
            } else if (code >= 65 && code <= 90) { // A-Z
                if (count === 5) {
                    result += ' ';
                    count = 0;
                }
                result += String.fromCharCode(zCode - (code + 32 - aCode));
                count++;
            }
        }
        
        return result;
    }

    decode = (text: string): string => {
        let result = '';
        
        for (let i = 0; i < text.length; i++) {
            const code = text.charCodeAt(i);
            
            if (isLowercase(code)) {
                result += String.fromCharCode(zCode - code + aCode);
            } else if (isDigit(code)) {
                result += text[i];
            }
        }
        
        return result;
    }
}