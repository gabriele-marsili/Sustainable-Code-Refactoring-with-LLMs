export class Anagram {
  private readonly word: string;
  private readonly sortedWord: string;
  private readonly lowerCaseWord: string;

  constructor(word: string) {
    this.word = word;
    this.lowerCaseWord = word.toLowerCase();
    this.sortedWord = this.sortString(this.lowerCaseWord);
  }

  public matches(...candidates: string[]): string[] {
    return candidates.filter((candidate) => {
      const lowerCaseCandidate = candidate.toLowerCase();
      if (this.lowerCaseWord === lowerCaseCandidate) {
        return false;
      }
      return this.sortedWord === this.sortString(lowerCaseCandidate);
    });
  }

  private sortString(str: string): string {
    return str.split('').sort().join('');
  }
}