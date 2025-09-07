export default {
    encode: function(text) {
        let result = '';
        let i = 0;
        const len = text.length;
        
        while (i < len) {
            const char = text[i];
            if (/\w/.test(char)) {
                let count = 1;
                while (i + count < len && text[i + count] === char) {
                    count++;
                }
                result += count + char;
                i += count;
            } else {
                result += char;
                i++;
            }
        }
        
        return result;
    },
    
    decode: function(text) {
        let result = '';
        let i = 0;
        const len = text.length;
        
        while (i < len) {
            if (/\d/.test(text[i])) {
                let numStr = '';
                while (i < len && /\d/.test(text[i])) {
                    numStr += text[i];
                    i++;
                }
                if (i < len) {
                    const count = parseInt(numStr, 10);
                    const char = text[i];
                    for (let j = 0; j < count; j++) {
                        result += char;
                    }
                    i++;
                }
            } else {
                result += text[i];
                i++;
            }
        }
        
        return result;
    }
};