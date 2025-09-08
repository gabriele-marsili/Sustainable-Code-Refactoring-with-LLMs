class Isogram {
    constructor(word) {
        this.word = word.toLowerCase();
    }

    isIsogram() {
        const seen = new Set();
        for (const char of this.word) {
            if (char !== '-' && char !== ' ' && seen.has(char)) {
                return false;
            }
            seen.add(char);
        }
        return true;
    }
}

export default Isogram;