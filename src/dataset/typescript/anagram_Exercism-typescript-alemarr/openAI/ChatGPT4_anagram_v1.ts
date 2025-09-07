export class Anagram {
  private readonly sortedWord: string;
  private readonly lowerCaseWord: string;

  constructor(private word: string) {
    this.lowerCaseWord = word.toLowerCase();
    this.sortedWord = this.sortString(this.lowerCaseWord);
  }

  matches(...potentials: string[]): string[] {
    return potentials.filter(word => {
      const lowerCaseWord = word.toLowerCase();
      return lowerCaseWord !== this.lowerCaseWord && this.sortString(lowerCaseWord) === this.sortedWord;
    });
  }

  private sortString(word: string): string {
    return word.split('').sort().join('');
  }
}