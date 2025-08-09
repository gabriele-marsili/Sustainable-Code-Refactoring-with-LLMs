const MIN_CHAR_CODE = 97 // char code of 'a'
const MAX_CHAR_CODE = 122 // char code of 'z'
const TOTAL_ALPHABET_LETTERS = 26

export function isPangram(sentence: string): boolean {
  const uniqueLetters = new Set<string>();

  for (let i = 0; i < sentence.length; i++) {
    const char = sentence[i].toLowerCase();
    const charCode = char.charCodeAt(0);

    // Check if the character is a lowercase alphabet letter
    if (charCode >= MIN_CHAR_CODE && charCode <= MAX_CHAR_CODE) {
      uniqueLetters.add(char);

      // Early exit: If all 26 unique letters have been found, it's a pangram
      if (uniqueLetters.size === TOTAL_ALPHABET_LETTERS) {
        return true;
      }
    }
  }

  // After iterating through the entire sentence, check if all 26 unique letters were found
  return uniqueLetters.size === TOTAL_ALPHABET_LETTERS;
}