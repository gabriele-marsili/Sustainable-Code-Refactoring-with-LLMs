export default class Isogram {
  public static isIsogram(input: string): boolean {
    const normalized = input.toLowerCase();
    const seen = new Set<string>();

    for (let i = 0; i < normalized.length; i++) {
      const char = normalized[i];
      if (char >= 'a' && char <= 'z') {
        if (seen.has(char)) {
          return false;
        }
        seen.add(char);
      }
    }

    return true;
  }
}