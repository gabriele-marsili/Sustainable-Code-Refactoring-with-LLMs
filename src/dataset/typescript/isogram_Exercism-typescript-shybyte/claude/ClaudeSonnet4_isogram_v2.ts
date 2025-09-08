export default class Isogram {
    static isIsogram(text: string) {
        const seen = new Set<string>()
        for (let i = 0; i < text.length; i++) {
            const char = text[i]
            if (char !== ' ' && char !== '-') {
                const lower = char.toLowerCase()
                if (seen.has(lower)) {
                    return false
                }
                seen.add(lower)
            }
        }
        return true
    }
}