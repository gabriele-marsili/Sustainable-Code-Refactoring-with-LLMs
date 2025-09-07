export default {
    parse: parse
};

function parse(phrase) {
    const words = phrase.split(/\W+/);
    let result = '';

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if (!word) continue;

        const firstChar = word.charAt(0).toUpperCase();

        if (word.length > 0 && /^[A-Z]+$/.test(word)) {
            result += firstChar;
        } else {
            let remainingChars = '';
            for (let j = 1; j < word.length; j++) {
                const char = word[j];
                if (char >= 'A' && char <= 'Z') {
                    remainingChars += char;
                }
            }
            result += firstChar + remainingChars;
        }
    }

    return result;
}