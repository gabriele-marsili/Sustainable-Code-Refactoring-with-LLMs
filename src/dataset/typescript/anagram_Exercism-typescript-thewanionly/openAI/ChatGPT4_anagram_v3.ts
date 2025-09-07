export class Anagram {
  private readonly normalizedWord: string;
  private readonly sortedWord: string;

  constructor(word: string) {
    this.normalizedWord = word.toLowerCase();
    this.sortedWord = this.sortLetters(this.normalizedWord);
  }

  public matches(...candidates: string[]): string[] {
    return candidates.filter((candidate) => {
      const normalizedCandidate = candidate.toLowerCase();
      return (
        this.normalizedWord !== normalizedCandidate &&
        this.sortedWord === this.sortLetters(normalizedCandidate)
      );
    });
  }

  private sortLetters(word: string): string {
    return Array.from(word).sort().join('');
  }
}