export default class Anagram {
  private readonly anagramCharCount: Record<string, number>;

  constructor(anagram: string) {
    this.anagramCharCount = this.getCharCount(anagram.toLowerCase());
  }

  private getCharCount(word: string): Record<string, number> {
    const charCount: Record<string, number> = {};
    for (const char of word) {
      charCount[char] = (charCount[char] || 0) + 1;
    }
    return charCount;
  }

  private isAnagram(word: string): boolean {
    if (Object.keys(this.anagramCharCount).length !== word.length) {
      return false;
    }
    const wordCharCount = this.getCharCount(word);
    for (const char in this.anagramCharCount) {
      if (this.anagramCharCount[char] !== wordCharCount[char]) {
        return false;
      }
    }
    return true;
  }

  public matches(...words: string[]): string[] {
    return words.filter((word) => {
      const lowerWord = word.toLowerCase();
      return lowerWord !== this.anagramCharCount && this.isAnagram(lowerWord);
    });
  }
}