export const isPangram = (text = "") => {
  const letterSet = new Set();
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char >= 'a' && char <= 'z') {
      letterSet.add(char);
      if (letterSet.size === 26) return true;
    } else if (char >= 'A' && char <= 'Z') {
      letterSet.add(char.toLowerCase());
      if (letterSet.size === 26) return true;
    }
  }
  
  return letterSet.size === 26;
};