export default {
    encode: function(text) {
        let result = '';
        let i = 0;
        const len = text.length;
        
        while (i < len) {
            const char = text[i];
            let count = 1;
            
            while (i + count < len && text[i + count] === char) {
                count++;
            }
            
            if (count > 1) {
                result += count + char;
            } else {
                result += char;
            }
            
            i += count;
        }
        
        return result;
    },
    
    decode: function(text) {
        let result = '';
        let i = 0;
        const len = text.length;
        
        while (i < len) {
            if (text[i] >= '0' && text[i] <= '9') {
                let numStr = '';
                while (i < len && text[i] >= '0' && text[i] <= '9') {
                    numStr += text[i];
                    i++;
                }
                const count = parseInt(numStr, 10);
                if (i < len) {
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