const MIN_CHAR_CODE = 97 // char code of 'a'
const MAX_CHAR_CODE = 122 // char code of 'z'
const TOTAL_ALPHABET_LETTERS = 26

export function isPangram(sentence: string): boolean {
  const uniqueLetters = new Set<string>();

  for (let i = 0; i < sentence.length; i++) {
    const char = sentence[i].toLowerCase();
    const charCode = char.charCodeAt(0);

    if (charCode >= MIN_CHAR_CODE && charCode <= MAX_CHAR_CODE) {
      uniqueLetters.add(char);
      if (uniqueLetters.size === TOTAL_ALPHABET_LETTERS) {
        return true; // All alphabet letters found, can exit early
      }
    }
  }

  return uniqueLetters.size === TOTAL_ALPHABET_LETTERS;
}