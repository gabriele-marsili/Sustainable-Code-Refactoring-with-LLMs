export default {
    parse: parse
};

function parse(phrase) {
    return phrase.split(/\W+/)
        .map(word => {
            if (!word) return '';
            const firstChar = word.charAt(0).toUpperCase();
            const rest = word.slice(1);

            if (word.match(/^[A-Z]+$/)) {
                return firstChar;
            }

            let result = '';
            for (let i = 0; i < rest.length; i++) {
                const char = rest[i];
                if (char >= 'A' && char <= 'Z') {
                    result += char;
                }
            }
            return firstChar + result;
        })
        .join('');
}