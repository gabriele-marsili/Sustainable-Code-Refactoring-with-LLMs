const aCode = 97; // 'a'.charCodeAt(0)
const zCode = 122; // 'z'.charCodeAt(0)

const isDigit = (charCode: number) => charCode >= 48 && charCode <= 57;
const isLowercase = (charCode: number) => charCode >= 97 && charCode <= 122;

const translateChar = (charCode: number) => 
    String.fromCharCode(zCode - (charCode - aCode));

export default class AtbashCipher {
    encode = (s: string) => {
        let result = '';
        let count = 0;
        
        for (let i = 0; i < s.length; i++) {
            const charCode = s.charCodeAt(i);
            const lowerCharCode = charCode >= 65 && charCode <= 90 ? charCode + 32 : charCode;
            
            if (isDigit(lowerCharCode)) {
                if (count === 5) {
                    result += ' ';
                    count = 0;
                }
                result += s[i];
                count++;
            } else if (isLowercase(lowerCharCode)) {
                if (count === 5) {
                    result += ' ';
                    count = 0;
                }
                result += translateChar(lowerCharCode);
                count++;
            }
        }
        
        return result;
    }

    decode = (text: string): string => {
        let result = '';
        
        for (let i = 0; i < text.length; i++) {
            const charCode = text.charCodeAt(i);
            
            if (isLowercase(charCode)) {
                result += String.fromCharCode(zCode - charCode + aCode);
            } else if (isDigit(charCode)) {
                result += text[i];
            }
        }
        
        return result;
    }
}