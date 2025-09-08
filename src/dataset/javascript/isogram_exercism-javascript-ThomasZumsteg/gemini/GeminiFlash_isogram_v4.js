class Isogram {
    constructor(word) {
        this.word = word;
    }

    isIsogram() {
        const cleanedWord = this.word.toLowerCase().replace(/[-\s]/g, '');
        const charSet = new Set();

        for (let i = 0; i < cleanedWord.length; i++) {
            const char = cleanedWord[i];
            if (charSet.has(char)) {
                return false;
            }
            charSet.add(char);
        }

        return true;
    }
}

export default Isogram;