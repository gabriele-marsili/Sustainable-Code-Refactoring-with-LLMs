const isUpperCase = (s: string): boolean => s === s.toUpperCase();

const isLetter = (char: string): boolean => {
    const upper = char.toUpperCase();
    const lower = char.toLowerCase();
    return upper !== lower;
};

const wordToAcronym = (word: string): string => {
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

const replacePunctuationWithSpace = (s: string): string => {
    let result = "";
    for (let i = 0; i < s.length; i++) {
        const char = s.charAt(i);
        result += isLetter(char) ? char : ' ';
    }
    return result;
};

const parse = (s: string): string => {
    const spacedString = replacePunctuationWithSpace(s);
    const words = spacedString.trim().split(/\s+/);
    let acronym = "";
    for (const word of words) {
        acronym += wordToAcronym(word);
    }
    return acronym;
};

export default { parse };