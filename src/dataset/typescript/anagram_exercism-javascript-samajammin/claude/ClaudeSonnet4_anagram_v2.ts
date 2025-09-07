export default class Anagram {
  private readonly anagram: string
  private readonly sortedAnagram: string
  private readonly anagramLength: number

  constructor(anagram: string) {
    this.anagram = anagram.toLowerCase()
    this.sortedAnagram = this.anagram.split('').sort().join('')
    this.anagramLength = this.anagram.length
  }

  private isAnagram(word: string): boolean {
    if (this.anagram === word || word.length !== this.anagramLength) {
      return false
    }
    return word.split('').sort().join('') === this.sortedAnagram
  }

  public matches(...words: string[]): string[] {
    return words.filter((word) => this.isAnagram(word.toLowerCase()))
  }
}