export default {
    parse: parse
};

function parse(phrase) {
    return phrase.split(/\W+/)
        .map(word => {
            const firstChar = word.charAt(0).toUpperCase();
            if (/^[A-Z]+$/.test(word)) {
                return firstChar;
            }
            let result = firstChar;
            for (let i = 1; i < word.length; i++) {
                const char = word[i];
                if (char >= 'A' && char <= 'Z') {
                    result += char;
                }
            }
            return result;
        })
        .join('');
}