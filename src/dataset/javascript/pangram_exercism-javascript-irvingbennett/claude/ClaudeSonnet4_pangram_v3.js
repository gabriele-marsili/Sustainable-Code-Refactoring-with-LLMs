export const isPangram = (text) => {
  if (text.length < 26) { return false }
  
  const seen = new Set();
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char >= 'a' && char <= 'z') {
      seen.add(char);
    } else if (char >= 'A' && char <= 'Z') {
      seen.add(char.toLowerCase());
    }
    
    if (seen.size === 26) {
      return true;
    }
  }
  
  return false;
};