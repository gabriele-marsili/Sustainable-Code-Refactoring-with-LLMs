export default {
    parse: parse
};

function parse(phrase) {
    let words = phrase.split(/\W+/);
    let result = "";

    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        if (word.length === 0) continue;

        let firstChar = word.charAt(0).toUpperCase();

        if (/^[A-Z]+$/.test(word)) {
            result += firstChar;
        } else {
            let remainingChars = "";
            for (let j = 1; j < word.length; j++) {
                let char = word[j];
                if (char >= 'A' && char <= 'Z') {
                    remainingChars += char;
                }
            }
            result += firstChar + remainingChars;
        }
    }

    return result;
}