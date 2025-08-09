export const isPangram = (text) => {
  if (text.length < 26) {
    return false;
  }

  const foundLetters = new Set();
  const lowercasedText = text.toLowerCase(); // Process to lowercase once

  for (let i = 0; i < lowercasedText.length; i++) {
    const char = lowercasedText[i];

    // Check if the character is a lowercase English alphabet letter
    if (char >= 'a' && char <= 'z') {
      foundLetters.add(char);

      // Early exit if all 26 unique letters are found
      if (foundLetters.size === 26) {
        return true;
      }
    }
  }

  // After iterating through the entire text, check if all 26 unique letters were found
  return foundLetters.size === 26;
};