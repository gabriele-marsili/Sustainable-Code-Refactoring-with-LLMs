class RotationalCipher {
    rotate(text, diff) {
        const normalizedDiff = ((diff % 26) + 26) % 26;
        
        if (normalizedDiff === 0) return text;
        
        let encoded = '';
        
        for (let i = 0; i < text.length; i++) {
            const charCode = text.charCodeAt(i);
            
            if (charCode >= 97 && charCode <= 122) {
                encoded += String.fromCharCode(((charCode - 97 + normalizedDiff) % 26) + 97);
            } else if (charCode >= 65 && charCode <= 90) {
                encoded += String.fromCharCode(((charCode - 65 + normalizedDiff) % 26) + 65);
            } else {
                encoded += text[i];
            }
        }
        
        return encoded;
    }
}

export default RotationalCipher;