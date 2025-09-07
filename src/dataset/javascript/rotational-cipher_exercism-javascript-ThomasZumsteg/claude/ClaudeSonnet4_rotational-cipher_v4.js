class RotationalCipher {
    rotate(text, diff) {
        const normalizedDiff = ((diff % 26) + 26) % 26;
        let encoded = '';
        
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const code = char.charCodeAt(0);
            
            if (code >= 97 && code <= 122) {
                encoded += String.fromCharCode(((code - 97 + normalizedDiff) % 26) + 97);
            } else if (code >= 65 && code <= 90) {
                encoded += String.fromCharCode(((code - 65 + normalizedDiff) % 26) + 65);
            } else {
                encoded += char;
            }
        }
        
        return encoded;
    }
}

export default RotationalCipher;