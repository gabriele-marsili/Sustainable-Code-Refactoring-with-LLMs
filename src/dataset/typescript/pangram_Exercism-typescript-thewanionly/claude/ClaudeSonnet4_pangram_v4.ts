const MIN_CHAR_CODE = 97 //char code of 'a'
const MAX_CHAR_CODE = 122 //char code of 'z'
const TOTAL_ALPHABET_LETTERS = 26

export function isPangram(sentence: string): boolean {
  const seen = new Set<number>()
  
  for (let i = 0; i < sentence.length; i++) {
    const charCode = sentence.charCodeAt(i)
    const lowerCharCode = charCode >= 65 && charCode <= 90 ? charCode + 32 : charCode
    
    if (lowerCharCode >= MIN_CHAR_CODE && lowerCharCode <= MAX_CHAR_CODE) {
      seen.add(lowerCharCode)
      if (seen.size === TOTAL_ALPHABET_LETTERS) {
        return true
      }
    }
  }
  
  return false
}