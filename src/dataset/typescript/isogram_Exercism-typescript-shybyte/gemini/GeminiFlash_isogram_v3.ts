export default class Isogram {
    static isIsogram(text: string): boolean {
        const cleanedText = text.replace(/[ -]/g, '').toLowerCase();
        if (cleanedText.length === 0) {
            return true;
        }

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