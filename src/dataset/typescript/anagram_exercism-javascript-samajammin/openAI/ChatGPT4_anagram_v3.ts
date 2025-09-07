export default class Anagram {
  private readonly anagram: string;
  private readonly sortedAnagram: string;

  constructor(anagram: string) {
    this.anagram = anagram.toLowerCase();
    this.sortedAnagram = this.sortString(this.anagram);
  }

  private sortString(word: string): string {
    return word.split('').sort().join('');
  }

  private isAnagram(word: string): boolean {
    return this.anagram !== word && this.sortedAnagram === this.sortString(word);
  }

  public matches(...words: string[]): string[] {
    const lowerCasedWords = words.map((word) => word.toLowerCase());
    return lowerCasedWords.filter((word) => this.isAnagram(word));
  }
}