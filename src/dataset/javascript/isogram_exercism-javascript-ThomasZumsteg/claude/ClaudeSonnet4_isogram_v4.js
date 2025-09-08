class Isogram {
    constructor(word) {
        this.word = word;
    }

    isIsogram() {
        const seen = new Set();
        for (let i = 0; i < this.word.length; i++) {
            const char = this.word[i];
            if (char !== '-' && char !== ' ') {
                const lowerChar = char.toLowerCase();
                if (seen.has(lowerChar)) {
                    return false;
                }
                seen.add(lowerChar);
            }
        }
        return true;
    }
}

export default Isogram;