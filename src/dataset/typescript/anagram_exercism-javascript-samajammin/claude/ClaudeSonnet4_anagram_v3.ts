export default class Anagram {
  private readonly anagramSorted: string
  private readonly anagramLower: string

  constructor(anagram: string) {
    this.anagramLower = anagram.toLowerCase()
    this.anagramSorted = this.anagramLower.split('').sort().join('')
  }

  private isAnagram(word: string): boolean {
    if (this.anagramLower === word) {
      return false
    }
    if (this.anagramLower.length !== word.length) {
      return false
    }
    return this.anagramSorted === word.split('').sort().join('')
  }

  public matches(...words: string[]): string[] {
    return words.filter((word) => this.isAnagram(word.toLowerCase()))
  }
}