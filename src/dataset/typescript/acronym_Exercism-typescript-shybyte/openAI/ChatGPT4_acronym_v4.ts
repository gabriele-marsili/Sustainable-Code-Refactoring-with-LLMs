const isUpperCase = (s: string) => s === s.toUpperCase();

const isLetter = (char: string) => /^[a-zA-Z]$/.test(char);

const wordToAcronym = (word: string) => {
    let acronym = word[0].toUpperCase();
    for (let i = 1; i < word.length; i++) {
        if (isUpperCase(word[i])) acronym += word[i];
    }
    return acronym;
};

const replacePunctuationWithSpace = (s: string) => s.replace(/[^a-zA-Z]/g, ' ');

const parse = (s: string) => {
    return replacePunctuationWithSpace(s)
        .trim()
        .split(/\s+/)
        .map(wordToAcronym)
        .join('');
};

export default { parse };