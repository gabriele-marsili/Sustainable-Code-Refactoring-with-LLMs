export default {
    parse: parse
};

function parse(phrase) {
    return phrase.split(/\W+/)
        .map(word => {
            const firstChar = word.charAt(0).toUpperCase();
            return /^[A-Z]+$/.test(word) 
                ? firstChar 
                : firstChar + [...word.slice(1)].filter(char => char >= 'A' && char <= 'Z').join('');
        })
        .join('');
}