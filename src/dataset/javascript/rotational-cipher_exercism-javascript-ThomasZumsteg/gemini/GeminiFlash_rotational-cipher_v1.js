class RotationalCipher {
    rotate(text, diff) {
        let encoded = '';
        const aCode = 'a'.charCodeAt(0);
        const zCode = 'z'.charCodeAt(0);
        const ACode = 'A'.charCodeAt(0);
        const ZCode = 'Z'.charCodeAt(0);

        for (let i = 0; i < text.length; i++) {
            const charCode = text.charCodeAt(i);
            let shiftedCharCode = charCode;

            if (charCode >= aCode && charCode <= zCode) {
                shiftedCharCode = aCode + (charCode - aCode + diff) % 26;
            } else if (charCode >= ACode && charCode <= ZCode) {
                shiftedCharCode = ACode + (charCode - ACode + diff) % 26;
            }

            encoded += String.fromCharCode(shiftedCharCode);
        }

        return encoded;
    }
}

export default RotationalCipher;