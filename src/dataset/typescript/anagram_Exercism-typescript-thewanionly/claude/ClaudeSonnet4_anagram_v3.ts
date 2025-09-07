export class Anagram {
  private readonly normalizedWord: string
  private readonly sortedWord: string

  constructor(word: string) {
    this.normalizedWord = word.toLowerCase()
    this.sortedWord = this.rearrange(this.normalizedWord)
  }

  public matches(...candidates: string[]): string[] {
    const result: string[] = []
    
    for (const candidate of candidates) {
      const normalizedCandidate = candidate.toLowerCase()
      if (this.normalizedWord !== normalizedCandidate && 
          this.sortedWord === this.rearrange(normalizedCandidate)) {
        result.push(candidate)
      }
    }
    
    return result
  }

  private rearrange(word: string): string {
    return word.split('').sort().join('')
  }
}