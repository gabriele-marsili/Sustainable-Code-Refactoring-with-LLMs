export default class Isogram {
  public static isIsogram(input: string): boolean {
    const length = input.length;
    const seen = new Set<string>();
    
    for (let i = 0; i < length; i++) {
      const char = input[i];
      if (char === '-' || char === ' ') continue;
      
      const normalized = char >= 'A' && char <= 'Z' ? 
        String.fromCharCode(char.charCodeAt(0) + 32) : char;
      
      if (seen.has(normalized)) return false;
      seen.add(normalized);
    }
    
    return true;
  }
}