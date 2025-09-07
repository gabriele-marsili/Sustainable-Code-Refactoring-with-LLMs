export default class Anagram {
  private readonly anagram: string
  private readonly sortedAnagram: string

  constructor(anagram: string) {
    this.anagram = anagram.toLowerCase()
    this.sortedAnagram = this.anagram.split('').sort().join('')
  }

  private isAnagram(word: string): boolean {
    if (this.anagram === word || this.anagram.length !== word.length) {
      return false
    }
    return this.sortedAnagram === word.split('').sort().join('')
  }

  public matches(...words: string[]): string[] {
    const result: string[] = []
    for (let i = 0; i < words.length; i++) {
      const lowerWord = words[i].toLowerCase()
      if (this.isAnagram(lowerWord)) {
        result.push(words[i])
      }
    }
    return result
  }
}