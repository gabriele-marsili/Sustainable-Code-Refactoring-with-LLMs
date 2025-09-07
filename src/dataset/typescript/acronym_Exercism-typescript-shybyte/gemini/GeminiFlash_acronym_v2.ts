const isUpperCase = (s: string) => s === s.toUpperCase();

const isLetter = (char: string) => {
    const upper = char.toUpperCase();
    return upper !== char.toLowerCase() && upper !== char;
};

const wordToAcronym = (word: string) => {
    if (isUpperCase(word)) {
        return word.charAt(0);
    }

    let acronym = word.charAt(0).toUpperCase();
    for (let i = 1; i < word.length; i++) {
        const char = word.charAt(i);
        if (isUpperCase(char)) {
            acronym += char;
        }
    }
    return acronym;
};

const replacePunctuationWithSpace = (s: string) => {
    let result = "";
    for (let i = 0; i < s.length; i++) {
        const char = s.charAt(i);
        result += isLetter(char) ? char : ' ';
    }
    return result;
};

const parse = (s: string) => {
    const spacedString = replacePunctuationWithSpace(s);
    const words = spacedString.trim().split(/\s+/);
    return words.map(wordToAcronym).join('');
};

export default { parse };