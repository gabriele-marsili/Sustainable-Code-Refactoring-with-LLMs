const shift = (chr, diff) => String.fromCharCode(chr.charCodeAt(0) + diff);

class RotationalCipher {
    rotate(text, diff) {
        const aCode = 'a'.charCodeAt(0);
        const zCode = 'z'.charCodeAt(0);
        const ACode = 'A'.charCodeAt(0);
        const ZCode = 'Z'.charCodeAt(0);
        const alphabetSize = 26;

        return Array.from(text, char => {
            const charCode = char.charCodeAt(0);
            if (charCode >= aCode && charCode <= zCode) {
                return String.fromCharCode(aCode + (charCode - aCode + diff) % alphabetSize);
            } else if (charCode >= ACode && charCode <= ZCode) {
                return String.fromCharCode(ACode + (charCode - ACode + diff) % alphabetSize);
            }
            return char;
        }).join('');
    }
}

export default RotationalCipher;