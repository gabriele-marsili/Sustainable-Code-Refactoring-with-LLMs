export default class Isogram {
    static isIsogram(text: string): boolean {
        const seen = new Set();
        for (const char of text.toLowerCase()) {
            if (char !== ' ' && char !== '-' && seen.has(char)) return false;
            seen.add(char);
        }
        return true;
    }
}