export default class Anagram {
  private readonly anagram: string;
  private readonly sortedAnagram: string;

  constructor(anagram: string) {
    this.anagram = anagram.toLowerCase();
    this.sortedAnagram = [...this.anagram].sort().join('');
  }

  private isAnagram(word: string): boolean {
    if (this.anagram === word) {
      return false;
    }
    const sortedWord = [...word].sort().join('');
    return this.sortedAnagram === sortedWord;
  }

  public matches(...words: string[]): string[] {
    return words.filter((word) => {
      const lowerCaseWord = word.toLowerCase();
      return this.isAnagram(lowerCaseWord);
    });
  }
}