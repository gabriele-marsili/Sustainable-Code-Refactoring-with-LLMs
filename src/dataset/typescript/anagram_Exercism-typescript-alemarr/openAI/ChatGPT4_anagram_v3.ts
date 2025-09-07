export class Anagram {
  private readonly sortedWord: string;
  private readonly lowerWord: string;

  constructor(private word: string) {
    this.lowerWord = word.toLowerCase();
    this.sortedWord = this.sortString(this.lowerWord);
  }

  matches(...potentials: string[]): string[] {
    return potentials.filter(word => {
      const lowerWord = word.toLowerCase();
      return lowerWord !== this.lowerWord && this.sortString(lowerWord) === this.sortedWord;
    });
  }

  private sortString(word: string): string {
    return [...word].sort().join('');
  }
}