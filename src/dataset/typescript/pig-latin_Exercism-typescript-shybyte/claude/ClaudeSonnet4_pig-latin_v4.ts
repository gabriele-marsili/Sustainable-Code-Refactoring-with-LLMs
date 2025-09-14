function translateWord(word: string) {
    let consonantEnd = 0;
    const len = word.length;
    
    if (word[0] === 'y') {
        consonantEnd = 1;
    } else {
        while (consonantEnd < len) {
            const char = word[consonantEnd];
            if (char === 'a' || char === 'e' || char === 'i' || char === 'o' || char === 'u') {
                break;
            }
            consonantEnd++;
            if (char === 'q' && consonantEnd < len && word[consonantEnd] === 'u') {
                consonantEnd++;
                break;
            }
        }
    }
    
    return word.slice(consonantEnd) + word.slice(0, consonantEnd) + 'ay';
}

export default class PigLatin {
    static translate(text: string) {
        const words = text.split(/\s+/);
        const result = new Array(words.length);
        
        for (let i = 0; i < words.length; i++) {
            result[i] = translateWord(words[i]);
        }
        
        return result.join(' ');
    }
}