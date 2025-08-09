export const isPangram = (string) => {
  const seen = new Set();
  for (const char of string.toLowerCase()) {
    if (char >= 'a' && char <= 'z') {
      seen.add(char);
      if (seen.size === 26) return true;
    }
  }
  return false;
};