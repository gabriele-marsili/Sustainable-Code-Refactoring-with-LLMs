var shift = function(chr, diff, lowerBound, upperBound) {
    const charCode = chr.charCodeAt(0);
    const range = upperBound - lowerBound + 1;
    return String.fromCharCode(((charCode - lowerBound + diff) % range + range) % range + lowerBound);
};

class RotationalCipher {
    rotate(text, diff) {
        diff = diff % 26;
        let encoded = '';
        for (let c = 0; c < text.length; c++) {
            const char = text[c];
            if (char >= 'a' && char <= 'z') {
                encoded += shift(char, diff, 97, 122);
            } else if (char >= 'A' && char <= 'Z') {
                encoded += shift(char, diff, 65, 90);
            } else {
                encoded += char;
            }
        }
        return encoded;
    }
}

export default RotationalCipher;