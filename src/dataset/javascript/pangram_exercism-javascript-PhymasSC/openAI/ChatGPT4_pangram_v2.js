export const isPangram = sentence => {
  const seen = new Set();
  for (const char of sentence.toLowerCase()) {
    if (char >= 'a' && char <= 'z') {
      seen.add(char);
      if (seen.size === 26) return true;
    }
  }
  return false;
};