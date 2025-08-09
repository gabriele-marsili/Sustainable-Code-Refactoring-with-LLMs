const MIN_CHAR_CODE = 97 //char code of 'a'
const MAX_CHAR_CODE = 122 //char code of 'z'
const TOTAL_ALPHABET_LETTERS = 26

export function isPangram(sentence: string): boolean {
  let seenLetters = 0;
  
  for (let i = 0; i < sentence.length; i++) {
    const charCode = sentence.charCodeAt(i) | 32; // Convert to lowercase using bitwise OR
    
    if (charCode >= MIN_CHAR_CODE && charCode <= MAX_CHAR_CODE) {
      const letterIndex = charCode - MIN_CHAR_CODE;
      const letterBit = 1 << letterIndex;
      
      if ((seenLetters & letterBit) === 0) {
        seenLetters |= letterBit;
        
        // Early exit if all letters found
        if (seenLetters === (1 << TOTAL_ALPHABET_LETTERS) - 1) {
          return true;
        }
      }
    }
  }
  
  return seenLetters === (1 << TOTAL_ALPHABET_LETTERS) - 1;
}