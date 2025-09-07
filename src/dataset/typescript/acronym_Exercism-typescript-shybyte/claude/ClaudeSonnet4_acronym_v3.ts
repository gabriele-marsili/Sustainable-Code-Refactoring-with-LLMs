/**
 * This solution might seem to be unnecessary complicated,
 * but a simple JS RegExp approach would not work e.g. for
 * https://en.wikipedia.org/wiki/Germanic_umlaut.
 */

const isUpperCase = (s: string) => s === s.toUpperCase()

// This might be wrong in some languages.
const isLetter = (char: string) => char.toUpperCase() !== char.toLowerCase()

const wordToAcronym = (word: string) => {
    if (!word) return ''
    
    const firstChar = word[0]
    if (isUpperCase(word)) return firstChar
    
    let result = firstChar.toUpperCase()
    for (let i = 1; i < word.length; i++) {
        if (isUpperCase(word[i])) {
            result += word[i]
        }
    }
    return result
}

const replacePunctuationWithSpace = (s: string) => {
    let result = ''
    for (let i = 0; i < s.length; i++) {
        result += isLetter(s[i]) ? s[i] : ' '
    }
    return result
}

const parse = (s: string) => {
    if (!s) return ''
    
    const cleaned = replacePunctuationWithSpace(s).trim()
    if (!cleaned) return ''
    
    let result = ''
    let wordStart = 0
    let inWord = false
    
    for (let i = 0; i <= cleaned.length; i++) {
        const char = cleaned[i]
        const isSpace = char === ' ' || i === cleaned.length
        
        if (!inWord && !isSpace) {
            wordStart = i
            inWord = true
        } else if (inWord && isSpace) {
            const word = cleaned.slice(wordStart, i)
            result += wordToAcronym(word)
            inWord = false
        }
    }
    
    return result
}

export default {parse}