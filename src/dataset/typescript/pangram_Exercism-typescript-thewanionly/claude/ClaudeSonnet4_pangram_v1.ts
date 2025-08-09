const MIN_CHAR_CODE = 97 //char code of 'a'
const MAX_CHAR_CODE = 122 //char code of 'z'
const TOTAL_ALPHABET_LETTERS = 26

export function isPangram(sentence: string): boolean {
  const seen = new Set<string>()
  
  for (let i = 0; i < sentence.length; i++) {
    const charCode = sentence.charCodeAt(i)
    
    // Convert to lowercase if uppercase
    const normalizedCharCode = charCode >= 65 && charCode <= 90 ? charCode + 32 : charCode
    
    if (normalizedCharCode >= MIN_CHAR_CODE && normalizedCharCode <= MAX_CHAR_CODE) {
      seen.add(String.fromCharCode(normalizedCharCode))
      
      // Early exit when all letters found
      if (seen.size === TOTAL_ALPHABET_LETTERS) {
        return true
      }
    }
  }
  
  return seen.size === TOTAL_ALPHABET_LETTERS
}