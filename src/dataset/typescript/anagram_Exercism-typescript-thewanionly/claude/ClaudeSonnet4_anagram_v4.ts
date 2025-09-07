export class Anagram {
  private readonly normalizedWord: string
  private readonly lowerWord: string

  constructor(word: string) {
    this.lowerWord = word.toLowerCase()
    this.normalizedWord = this.lowerWord.split('').sort().join('')
  }

  public matches(...candidates: string[]): string[] {
    const result: string[] = []
    
    for (const candidate of candidates) {
      const lowerCandidate = candidate.toLowerCase()
      if (this.lowerWord !== lowerCandidate && 
          this.normalizedWord === lowerCandidate.split('').sort().join('')) {
        result.push(candidate)
      }
    }
    
    return result
  }
}