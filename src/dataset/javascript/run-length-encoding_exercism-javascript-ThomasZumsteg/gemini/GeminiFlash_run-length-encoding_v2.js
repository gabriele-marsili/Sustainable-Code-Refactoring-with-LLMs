export default {
    encode: function(text) {
        return text.replace(/(\w)\1+/g, (match, char) => match.length + char);
    },
    decode: function(text) {
        return text.replace(/(\d+)(\w)/g, (match, count, char) => char.repeat(parseInt(count, 10)));
    }
};