export default class Isogram {
    static isIsogram(text: string) {
        const cleanedText = text.replace(/[ -]/g, '').toLowerCase();
        const seen = new Set<string>();

        for (let i = 0; i < cleanedText.length; i++) {
            const char = cleanedText[i];
            if (seen.has(char)) {
                return false;
            }
            seen.add(char);
        }

        return true;
    }
}