export const isPangram = (text) => {
  if (text.length < 26) return false;
  const seen = new Set();
  for (const char of text.toLowerCase()) {
    if (char >= 'a' && char <= 'z') {
      seen.add(char);
      if (seen.size === 26) return true;
    }
  }
  return false;
};