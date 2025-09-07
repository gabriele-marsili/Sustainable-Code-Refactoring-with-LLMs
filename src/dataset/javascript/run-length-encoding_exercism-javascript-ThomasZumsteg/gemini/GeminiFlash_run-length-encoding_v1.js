export default {
    encode: function(text) {
        let encoded = "";
        let count = 1;
        for (let i = 0; i < text.length; i++) {
            if (i + 1 < text.length && text[i] === text[i + 1]) {
                count++;
            } else {
                if (count > 1) {
                    encoded += count.toString() + text[i];
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
        let i = 0;
        while (i < text.length) {
            if (isNaN(parseInt(text[i]))) {
                decoded += text[i];
                i++;
            } else {
                let numStr = "";
                while (i < text.length && !isNaN(parseInt(text[i]))) {
                    numStr += text[i];
                    i++;
                }
                const num = parseInt(numStr);
                decoded += text[i].repeat(num);
                i++;
            }
        }
        return decoded;
    }
};