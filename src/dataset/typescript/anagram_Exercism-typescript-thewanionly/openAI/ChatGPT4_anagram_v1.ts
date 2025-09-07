export class Anagram {
  private readonly normalizedWord: string;
  private readonly sortedWord: string;

  constructor(word: string) {
    this.word = word.toLowerCase();
    this.normalizedWord = this.word;
    this.sortedWord = this.sortWord(this.word);
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
    return [...word].sort().join('');
  }
}