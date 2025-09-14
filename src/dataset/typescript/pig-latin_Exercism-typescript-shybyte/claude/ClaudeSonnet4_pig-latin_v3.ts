function translateWord(word: string): string {
    let consonantEnd = 0;
    const length = word.length;
    
    if (word[0] === 'y') {
        consonantEnd = 1;
    } else {
        for (let i = 0; i < length; i++) {
            const char = word[i];
            if (char === 'a' || char === 'e' || char === 'i' || char === 'o' || char === 'u') {
                break;
            }
            consonantEnd = i + 1;
            if (char === 'q' && i + 1 < length && word[i + 1] === 'u') {
                consonantEnd = i + 2;
                break;
            }
        }
    }
    
    return word.slice(consonantEnd) + word.slice(0, consonantEnd) + 'ay';
}

export default class PigLatin {
    static translate(text: string): string {
        let result = '';
        let wordStart = 0;
        const length = text.length;
        
        for (let i = 0; i <= length; i++) {
            if (i === length || text[i] === ' ') {
                if (i > wordStart) {
                    if (result) result += ' ';
                    result += translateWord(text.slice(wordStart, i));
                }
                wordStart = i + 1;
            }
        }
        
        return result;
    }
}