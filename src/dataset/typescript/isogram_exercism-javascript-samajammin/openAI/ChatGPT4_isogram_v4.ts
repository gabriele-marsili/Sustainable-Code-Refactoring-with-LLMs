export default class Isogram {
  public static isIsogram(input: string): boolean {
    const seen = new Set<string>();
    for (const char of input.toLowerCase()) {
      if (char !== '-' && char !== ' ' && seen.has(char)) return false;
      if (char !== '-' && char !== ' ') seen.add(char);
    }
    return true;
  }
}