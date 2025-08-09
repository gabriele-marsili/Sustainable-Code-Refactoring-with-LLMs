export const isPangram = (text) => {
  if (text.length < 26) return false;
  
  let foundLetters = 0;
  const seen = new Set();
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char >= 'a' && char <= 'z') {
      if (!seen.has(char)) {
        seen.add(char);
        foundLetters++;
        if (foundLetters === 26) return true;
      }
    } else if (char >= 'A' && char <= 'Z') {
      const lowerChar = String.fromCharCode(char.charCodeAt(0) + 32);
      if (!seen.has(lowerChar)) {
        seen.add(lowerChar);
        foundLetters++;
        if (foundLetters === 26) return true;
      }
    }
  }
  
  return false;
};