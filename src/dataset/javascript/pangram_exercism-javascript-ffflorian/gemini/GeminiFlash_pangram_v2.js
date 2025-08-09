export function isPangram(sentence) {
  const remainingLetters = new Set('abcdefghijklmnopqrstuvwxyz');

  for (let i = 0; i < sentence.length; i++) {
    const char = sentence[i].toLowerCase();

    if (char >= 'a' && char <= 'z') {
      remainingLetters.delete(char);

      // Early exit: if all 26 letters have been found, we can stop
      if (remainingLetters.size === 0) {
        return true;
      }
    }
  }

  // If the loop finishes and the set is empty, it's a pangram
  return remainingLetters.size === 0;
}