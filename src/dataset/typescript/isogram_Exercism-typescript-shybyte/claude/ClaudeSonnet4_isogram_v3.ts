export default class Isogram {
    static isIsogram(text: string): boolean {
        const seen = new Set<string>();
        
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (char === ' ' || char === '-') continue;
            
            const lowerChar = char.toLowerCase();
            if (seen.has(lowerChar)) return false;
            seen.add(lowerChar);
        }
        
        return true;
    }
}