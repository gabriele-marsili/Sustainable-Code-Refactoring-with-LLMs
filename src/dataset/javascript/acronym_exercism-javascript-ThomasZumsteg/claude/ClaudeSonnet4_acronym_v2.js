export default {
    parse: parse
};

function parse(phrase) {
    let result = '';
    let word = '';
    let inWord = false;
    
    for (let i = 0; i < phrase.length; i++) {
        const char = phrase[i];
        const isWordChar = (char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z') || (char >= '0' && char <= '9');
        
        if (isWordChar) {
            if (!inWord) {
                if (word) {
                    result += processWord(word);
                    word = '';
                }
                inWord = true;
            }
            word += char;
        } else {
            inWord = false;
        }
    }
    
    if (word) {
        result += processWord(word);
    }
    
    return result;
}

function processWord(word) {
    const firstChar = word[0].toUpperCase();
    
    if (word.length === 1) {
        return firstChar;
    }
    
    let isAllCaps = true;
    for (let i = 0; i < word.length; i++) {
        const char = word[i];
        if (char >= 'a' && char <= 'z') {
            isAllCaps = false;
            break;
        }
    }
    
    if (isAllCaps) {
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
}