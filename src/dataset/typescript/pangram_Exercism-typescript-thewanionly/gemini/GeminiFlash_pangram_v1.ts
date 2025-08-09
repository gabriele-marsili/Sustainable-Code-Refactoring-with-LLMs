const ALPHA_LOWER_MIN_CODE = 97; // char code of 'a'
const ALPHA_LOWER_MAX_CODE = 122; // char code of 'z'
const ALPHA_UPPER_MIN_CODE = 65; // char code of 'A'
const ALPHA_UPPER_MAX_CODE = 90; // char code of 'Z'
const TOTAL_ALPHABET_LETTERS = 26;

export function isPangram(sentence: string): boolean {
  // Use a boolean array to track seen letters.
  // Index 0 corresponds to 'a' (or 'A'), 1 to 'b' (or 'B'), ..., 25 to 'z' (or 'Z').
  const seenLetters = new Array<boolean>(TOTAL_ALPHABET_LETTERS).fill(false);
  let uniqueLetterCount = 0;

  for (let i = 0; i < sentence.length; i++) {
    const charCode = sentence.charCodeAt(i);
    let letterIndex = -1;

    // Check if it's a lowercase letter ('a' through 'z')
    if (charCode >= ALPHA_LOWER_MIN_CODE && charCode <= ALPHA_LOWER_MAX_CODE) {
      letterIndex = charCode - ALPHA_LOWER_MIN_CODE;
    } 
    // Check if it's an uppercase letter ('A' through 'Z')
    else if (charCode >= ALPHA_UPPER_MIN_CODE && charCode <= ALPHA_UPPER_MAX_CODE) {
      letterIndex = charCode - ALPHA_UPPER_MIN_CODE;
    }

    // If it's an alphabet letter and we haven't seen it before
    if (letterIndex !== -1 && !seenLetters[letterIndex]) {
      seenLetters[letterIndex] = true; // Mark as seen
      uniqueLetterCount++; // Increment count of unique letters found

      // If we have found all 26 unique letters, it's a pangram, exit early
      if (uniqueLetterCount === TOTAL_ALPHABET_LETTERS) {
        return true;
      }
    }
  }

  // After checking all characters, return true if all 26 unique letters were found
  return uniqueLetterCount === TOTAL_ALPHABET_LETTERS;
}