export default class Isogram {
  public static isIsogram(input: string): boolean {
    const seen = new Set<string>();
    
    for (let i = 0; i < input.length; i++) {
      const char = input[i];
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