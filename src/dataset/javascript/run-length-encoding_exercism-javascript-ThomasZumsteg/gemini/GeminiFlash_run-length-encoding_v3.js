export default {
    encode: function(text) {
        let encoded = "";
        let count = 1;
        for (let i = 0; i < text.length; i++) {
            if (i + 1 < text.length && text[i] === text[i + 1] && /[\w]/.test(text[i])) {
                count++;
            } else {
                if (count > 1 && /[\w]/.test(text[i])) {
                    encoded += count + text[i];
                } else {
                    encoded += text[i];
                }
                count = 1;
            }
        }
        return encoded;
    },
    decode: function(text) {
        let decoded = "";
        let numStr = "";
        for (let i = 0; i < text.length; i++) {
            if (/\d/.test(text[i])) {
                numStr += text[i];
            } else {
                if (numStr !== "") {
                    const num = parseInt(numStr, 10);
                    decoded += text[i].repeat(num);
                    numStr = "";
                } else {
                    decoded += text[i];
                }
            }
        }
        return decoded;
    }
};