export default class Isogram {
    static isIsogram(text: string): boolean {
        const cleanedText = text.replace(/[ -]/g, '').toLowerCase();
        const seenLetters = new Set<string>();

        for (let i = 0; i < cleanedText.length; i++) {
            const char = cleanedText[i];
            if (seenLetters.has(char)) {
                return false;
            }
            seenLetters.add(char);
        }

        return true;
    }
}