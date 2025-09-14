function translateWord(word: string) {
    let i = 0
    const len = word.length
    
    // Handle 'qu' at start
    if (word[0] === 'q' && word[1] === 'u') {
        return word.slice(2) + 'quay'
    }
    
    // Handle 'y' at start
    if (word[0] === 'y') {
        return word.slice(1) + 'yay'
    }
    
    // Find first vowel
    while (i < len) {
        const char = word[i]
        if (char === 'a' || char === 'e' || char === 'i' || char === 'o' || char === 'u') {
            break
        }
        if (char === 'q' && word[i + 1] === 'u') {
            i += 2
            break
        }
        if (char === 'y' && i > 0) {
            break
        }
        i++
    }
    
    return word.slice(i) + word.slice(0, i) + 'ay'
}

export default class PigLatin {
    static translate(text: string) {
        let result = ''
        let wordStart = 0
        const len = text.length
        
        for (let i = 0; i <= len; i++) {
            if (i === len || text[i] === ' ' || text[i] === '\t' || text[i] === '\n' || text[i] === '\r') {
                if (i > wordStart) {
                    if (result) result += ' '
                    result += translateWord(text.slice(wordStart, i))
                }
                // Skip whitespace
                while (i < len && (text[i] === ' ' || text[i] === '\t' || text[i] === '\n' || text[i] === '\r')) {
                    i++
                }
                wordStart = i
                i--
            }
        }
        
        return result
    }
}