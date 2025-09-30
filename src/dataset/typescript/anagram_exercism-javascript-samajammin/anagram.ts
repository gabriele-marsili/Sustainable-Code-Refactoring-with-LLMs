export default class Anagram {
  private readonly anagram: string
  private readonly sortedAnagram: string

  constructor(anagram: string) {
    this.anagram = anagram.toLowerCase()
    this.sortedAnagram = this.anagram.split('').sort().join('')
  }

  private isAnagram(word: string): boolean {
    if (this.anagram === word) {
      return false
    }
    if (this.anagram.length !== word.length) {
      return false
    }
    return this.sortedAnagram === word.split('').sort().join('')
  }

  public matches(...words: string[]): string[] {
    return words.filter((word) => this.isAnagram(word.toLowerCase()))
  }
}