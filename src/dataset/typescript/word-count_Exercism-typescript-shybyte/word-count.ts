export default class Words {
    count(text: string) {
        const words = text.trim().toLowerCase().split(/\s+/)
        const wordCounts = new Map<string, number>()
        for (const word of words) {
            wordCounts.set(word, (wordCounts.get(word) || 0) + 1)
        }
        return wordCounts
    }
}