export class Anagram {
  private readonly normalizedWord: string;
  private readonly sortedWord: string;

  constructor(word: string) {
    this.normalizedWord = word.toLowerCase();
    this.sortedWord = Anagram.sortWord(this.normalizedWord);
  }

  public matches(...candidates: string[]): string[] {
    return candidates.filter((candidate) => {
      const normalizedCandidate = candidate.toLowerCase();
      return (
        this.normalizedWord !== normalizedCandidate &&
        this.sortedWord === Anagram.sortWord(normalizedCandidate)
      );
    });
  }

  private static sortWord(word: string): string {
    return word.split('').sort().join('');
  }
}