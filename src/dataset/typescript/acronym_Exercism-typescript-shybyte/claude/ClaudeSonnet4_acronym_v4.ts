const isUpperCase = (s: string) => s === s.toUpperCase()

const isLetter = (char: string) => char.toUpperCase() !== char.toLowerCase()

const wordToAcronym = (word: string) => {
    if (!word) return ''
    
    if (isUpperCase(word)) return word[0]
    
    let result = word[0].toUpperCase()
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
    const cleaned = replacePunctuationWithSpace(s).trim()
    if (!cleaned) return ''
    
    const words = cleaned.split(/\s+/)
    let result = ''
    for (let i = 0; i < words.length; i++) {
        result += wordToAcronym(words[i])
    }
    return result
}

export default {parse}