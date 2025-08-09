export default class Pangram {
    private word: string

    constructor(word: string) {
        this.word = word;
    }

    isPangram(): boolean {
        let letterMask = 0;
        
        for (let i = 0; i < this.word.length; i++) {
            const char = this.word.charCodeAt(i);
            let letterIndex = -1;
            
            if (char >= 65 && char <= 90) { // A-Z
                letterIndex = char - 65;
            } else if (char >= 97 && char <= 122) { // a-z
                letterIndex = char - 97;
            }
            
            if (letterIndex !== -1) {
                letterMask |= (1 << letterIndex);
                if (letterMask === 0x3FFFFFF) { // All 26 bits set
                    return true;
                }
            }
        }
        
        return false;
    }
}