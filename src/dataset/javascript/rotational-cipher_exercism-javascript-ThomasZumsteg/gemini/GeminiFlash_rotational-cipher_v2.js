class RotationalCipher {
    rotate(text, diff) {
        let encoded = '';
        const len = text.length;

        for (let i = 0; i < len; i++) {
            const char = text[i];
            const charCode = char.charCodeAt(0);
            let rotatedCharCode = charCode;

            if (charCode >= 97 && charCode <= 122) { // a-z
                rotatedCharCode = ((charCode - 97 + diff) % 26) + 97;
            } else if (charCode >= 65 && charCode <= 90) { // A-Z
                rotatedCharCode = ((charCode - 65 + diff) % 26) + 65;
            }

            encoded += String.fromCharCode(rotatedCharCode);
        }

        return encoded;
    }
}

export default RotationalCipher;