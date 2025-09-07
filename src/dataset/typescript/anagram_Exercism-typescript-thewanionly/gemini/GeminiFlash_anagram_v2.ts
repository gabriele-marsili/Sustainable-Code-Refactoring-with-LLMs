export class Anagram {
  private word: string
  private sortedWord: string

  constructor(word: string) {
    this.word = word
    this.sortedWord = this.rearrange(word)
  }

  public matches(...candidates: string[]): string[] {
    const lowerCaseWord = this.word.toLowerCase()
    return candidates.filter((candidate) => {
      const lowerCaseCandidate = candidate.toLowerCase()
      return (
        lowerCaseWord !== lowerCaseCandidate &&
        this.sortedWord === this.rearrange(candidate)
      )
    })
  }

  private rearrange(word: string): string {
    return word
      .toLowerCase()
      .split('')
      .sort()
      .join('')
  }
}