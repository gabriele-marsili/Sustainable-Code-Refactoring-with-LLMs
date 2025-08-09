const MIN_CHAR_CODE = 97 // char code of 'a'
const MAX_CHAR_CODE = 122 // char code of 'z'
const TOTAL_ALPHABET_LETTERS = 26

export function isPangram(sentence: string): boolean {
  const seen = new Set<number>()
  for (let i = 0; i < sentence.length; i++) {
    const code = sentence.charCodeAt(i) | 32
    if (code >= MIN_CHAR_CODE && code <= MAX_CHAR_CODE) {
      seen.add(code)
      if (seen.size === TOTAL_ALPHABET_LETTERS) return true
    }
  }
  return false
}