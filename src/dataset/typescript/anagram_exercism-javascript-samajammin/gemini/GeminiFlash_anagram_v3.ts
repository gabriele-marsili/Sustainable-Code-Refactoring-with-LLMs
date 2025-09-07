export default class Anagram {
  private readonly anagram: string;
  private readonly sortedAnagram: string;
  private readonly anagramLength: number;

  constructor(anagram: string) {
    this.anagram = anagram.toLowerCase();
    this.anagramLength = this.anagram.length;
    this.sortedAnagram = [...this.anagram].sort().join('');
  }

  private isAnagram(word: string): boolean {
    if (this.anagramLength !== word.length || this.anagram === word) {
      return false;
    }

    const sortedWord = [...word].sort().join('');
    return this.sortedAnagram === sortedWord;
  }

  public matches(...words: string[]): string[] {
    return words.filter((word) => this.isAnagram(word.toLowerCase()));
  }
}