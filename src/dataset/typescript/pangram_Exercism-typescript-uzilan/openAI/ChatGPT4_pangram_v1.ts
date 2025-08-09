export default class Pangram {
    private word: string;

    constructor(word: string) {
        this.word = word;
    }

    isPangram(): boolean {
        const seen = new Set<number>();
        for (let i = 0; i < this.word.length; i++) {
            const code = this.word.charCodeAt(i) | 32;
            if (code >= 97 && code <= 122) {
                seen.add(code);
                if (seen.size === 26) return true;
            }
        }
        return false;
    }
}