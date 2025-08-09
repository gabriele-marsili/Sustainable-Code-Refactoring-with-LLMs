export const isPangram = (text) => {
  if (text.length < 26) {
    return false;
  }

  const foundLetters = new Set();
  const lowercasedText = text.toLowerCase();

  for (let i = 0; i < lowercasedText.length; i++) {
    const charCode = lowercasedText.charCodeAt(i);

    if (charCode >= 97 && charCode <= 122) { // 'a' through 'z' ASCII range
      foundLetters.add(charCode);
      if (foundLetters.size === 26) {
        return true;
      }
    }
  }

  return foundLetters.size === 26;
};