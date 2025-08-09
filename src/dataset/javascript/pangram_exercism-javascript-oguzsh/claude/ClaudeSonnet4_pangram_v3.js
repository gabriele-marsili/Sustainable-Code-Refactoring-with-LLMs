export const isPangram = (text = "") => {
  const normalizedText = text.toLowerCase();
  const letterSet = new Set();
  
  for (let i = 0; i < normalizedText.length; i++) {
    const char = normalizedText[i];
    if (char >= 'a' && char <= 'z') {
      letterSet.add(char);
      if (letterSet.size === 26) {
        return true;
      }
    }
  }
  
  return false;
};