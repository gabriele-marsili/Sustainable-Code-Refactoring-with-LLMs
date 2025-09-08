export function isIsogram(word: string): boolean {
  const seen = new Set<string>()
  
  for (let i = 0; i < word.length; i++) {
    const char = word[i].toLowerCase()
    if (char >= 'a' && char <= 'z') {
      if (seen.has(char)) {
        return false
      }
      seen.add(char)
    }
  }
  
  return true
}