export default class Pangram {
  readonly phrase: string;

  constructor(phrase: string) {
    this.phrase = phrase.toLowerCase();
  }

  isPangram(): boolean {
    let seenLettersBitmask = 0;
    const allLettersMask = (1 << 26) - 1; // A bitmask where all 26 bits (0-25) are set to 1

    // Iterate directly over the phrase string
    for (let i = 0; i < this.phrase.length; i++) {
      const charCode = this.phrase.charCodeAt(i);

      // Check if the character is a lowercase English alphabet letter ('a' to 'z')
      // 'a' has char code 97, 'z' has char code 122
      if (charCode >= 97 && charCode <= 122) {
        const letterIndex = charCode - 97; // Calculate 0-25 index for the letter
        seenLettersBitmask |= (1 << letterIndex); // Set the corresponding bit in the mask

        // Early exit: If all 26 bits are set, we've found all letters
        if (seenLettersBitmask === allLettersMask) {
          return true;
        }
      }
    }

    // After iterating through the entire phrase, check if all 26 bits were set
    return seenLettersBitmask === allLettersMask;
  }
}