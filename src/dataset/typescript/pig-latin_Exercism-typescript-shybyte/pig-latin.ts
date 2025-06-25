function translateWord(word: string) {
    const match = /^([^auoie]*qu|^y|[^auoiey]*)(.*)$/.exec(word)!
    const consonantHead = match[1]
    const tail = match[2]
    return tail + consonantHead + 'ay'
}

export default class PigLatin {
    static translate(text: string) {
        return text.split(/\s+/).map(translateWord).join(' ')
    }
}