export default class Isogram {
  public static isIsogram(input: string): boolean {
    const seen = new Set<string>();
    
    for (let i = 0; i < input.length; i++) {
      const char = input[i];
      if (char !== '-' && char !== ' ') {
        const normalized = char.toLowerCase();
        if (seen.has(normalized)) {
          return false;
        }
        seen.add(normalized);
      }
    }
    
    return true;
  }
}