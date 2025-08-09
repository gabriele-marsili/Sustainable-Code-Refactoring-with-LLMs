export const isPangram = (text) => {
  if (text.length < 26) { return false }
  
  const seen = new Set();
  const lowerText = text.toLowerCase();
  
  for (let i = 0; i < lowerText.length; i++) {
    const char = lowerText[i];
    if (char >= 'a' && char <= 'z') {
      seen.add(char);
      if (seen.size === 26) {
        return true;
      }
    }
  }
  
  return false;
};