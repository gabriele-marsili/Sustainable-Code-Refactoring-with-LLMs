class RotationalCipher {
    rotate(text, diff) {
        const lowerA = 'a'.charCodeAt(0);
        const lowerZ = 'z'.charCodeAt(0);
        const upperA = 'A'.charCodeAt(0);
        const upperZ = 'Z'.charCodeAt(0);
        const alphabetSize = 26;

        diff = diff % alphabetSize; // Normalize diff to avoid unnecessary rotations
        let encoded = '';

        for (let i = 0; i < text.length; i++) {
            const charCode = text.charCodeAt(i);

            if (charCode >= lowerA && charCode <= lowerZ) {
                encoded += String.fromCharCode(((charCode - lowerA + diff) % alphabetSize) + lowerA);
            } else if (charCode >= upperA && charCode <= upperZ) {
                encoded += String.fromCharCode(((charCode - upperA + diff) % alphabetSize) + upperA);
            } else {
                encoded += text[i];
            }
        }

        return encoded;
    }
}

export default RotationalCipher;