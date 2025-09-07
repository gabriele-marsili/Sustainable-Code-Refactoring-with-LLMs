class RotationalCipher {
    rotate(text, diff) {
        const lowerA = 'a'.charCodeAt(0), lowerZ = 'z'.charCodeAt(0);
        const upperA = 'A'.charCodeAt(0), upperZ = 'Z'.charCodeAt(0);
        const shiftChar = (char, base, range) => String.fromCharCode(((char.charCodeAt(0) - base + diff) % range + range) % range + base);

        let encoded = '';
        for (let c = 0; c < text.length; c++) {
            const char = text[c];
            if (char >= 'a' && char <= 'z') {
                encoded += shiftChar(char, lowerA, 26);
            } else if (char >= 'A' && char <= 'Z') {
                encoded += shiftChar(char, upperA, 26);
            } else {
                encoded += char;
            }
        }
        return encoded;
    }
}

export default RotationalCipher;