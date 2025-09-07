export default {
    encode: function(text) {
        return text.replace(/(\w)\1+/g, (match, char) => match.length + char);
    },
    decode: function(text) {
        return text.replace(/(\d+)(\w)/g, (match, count, char) => {
            let result = '';
            const num = parseInt(count, 10);
            for (let i = 0; i < num; i++) {
                result += char;
            }
            return result;
        });
    }
};