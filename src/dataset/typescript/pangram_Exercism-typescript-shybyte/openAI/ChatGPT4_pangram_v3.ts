const ALPHABET_SIZE = 26;

export default class Pangram {
    text: string;

    constructor(text: string) {
        this.text = text;
    }

    isPangram() {
        const seen = new Set<string>();
        for (let i = 0; i < this.text.length; i++) {
            const code = this.text.charCodeAt(i);
            if (code >= 65 && code <= 90) {
                seen.add(String.fromCharCode(code + 32));
            } else if (code >= 97 && code <= 122) {
                seen.add(this.text[i]);
            }
            if (seen.size === ALPHABET_SIZE) return true;
        }
        return false;
    }
}

const numberOfDistinctElements = (array: string[]) => new Set(array).size;