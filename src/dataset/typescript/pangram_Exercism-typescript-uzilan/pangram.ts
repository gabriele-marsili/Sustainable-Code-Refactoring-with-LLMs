export default class Pangram {
    private word: string
    private regex = /^[a-zA-Z]$/;

    constructor(word: string) {
        this.word = word;
    }

    isPangram(): boolean {
        const abc = new Set<string>();
        this.word.split("")
            .filter(l => this.regex.test(l))
            .forEach(l =>
                abc.add(l.toLowerCase())
            );
        return abc.size === 26;
    }
}