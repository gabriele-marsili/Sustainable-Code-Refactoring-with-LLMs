export const isPangram = (text = "") => {
  const seenLetters = new Set();
  const aCode = 'a'.charCodeAt(0);
  const zCode = 'z'.charCodeAt(0);

  for (let i = 0; i < text.length; i++) {
    const char = text[i].toLowerCase();
    const charCode = char.charCodeAt(0);

    // Check if the character is a lowercase letter (a-z)
    if (charCode >= aCode && charCode <= zCode) {
      seenLetters.add(char);
      // Early exit: If we've found all 26 unique letters, it's a pangram.
      if (seenLetters.size === 26) {
        return true;
      }
    }
  }

  // After iterating through the entire text, check if all 26 letters were found.
  return seenLetters.size === 26;
};