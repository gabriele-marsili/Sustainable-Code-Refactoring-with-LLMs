class Isogram {
    constructor(word) {
        this.word = word;
    }

    isIsogram() {
        const seen = new Set();
        for (let i = 0; i < this.word.length; i++) {
            const char = this.word[i].toLowerCase();
            if (char !== '-' && char !== ' ') {
                if (seen.has(char)) {
                    return false;
                }
                seen.add(char);
            }
        }
        return true;
    }
}

export default Isogram;