export default {
    encode(text) {
        return text.replace(/(\w)\1+/g, (group) => group.length + group[0]);
    },
    decode(text) {
        return text.replace(/(\d+)(\w)/g, (_, number, chr) => chr.repeat(Number(number)));
    }
};