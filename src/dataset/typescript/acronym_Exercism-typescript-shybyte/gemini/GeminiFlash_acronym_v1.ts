const isUpperCase = (s: string): boolean => s === s.toUpperCase();

const isLetter = (char: string): boolean => {
    const charCode = char.charCodeAt(0);
    return (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122);
};

const wordToAcronym = (word: string): string => {
    if (isUpperCase(word)) {
        return word.charAt(0);
    }

    let acronym = word.charAt(0).toUpperCase();
    for (let i = 1; i < word.length; i++) {
        if (isUpperCase(word.charAt(i))) {
            acronym += word.charAt(i);
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
    const replaced = replacePunctuationWithSpace(s);
    const words = replaced.trim().split(/\s+/);
    let acronym = "";
    for (let i = 0; i < words.length; i++) {
        acronym += wordToAcronym(words[i]);
    }
    return acronym;
};

export default { parse };