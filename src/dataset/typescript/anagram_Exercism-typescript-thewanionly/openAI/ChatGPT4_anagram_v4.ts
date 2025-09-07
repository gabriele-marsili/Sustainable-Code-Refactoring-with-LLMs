export class Anagram {
  private readonly normalizedWord: string;
  private readonly sortedWord: string;

  constructor(word: string) {
    this.normalizedWord = word.toLowerCase();
    this.sortedWord = this.sortWord(this.normalizedWord);
  }

  public matches(...candidates: string[]): string[] {
    return candidates.filter((candidate) => {
      const normalizedCandidate = candidate.toLowerCase();
      return (
        this.normalizedWord !== normalizedCandidate &&
        this.sortedWord === this.sortWord(normalizedCandidate)
      );
    });
  }

  private sortWord(word: string): string {
    return Array.from(word).sort().join('');
  }
}