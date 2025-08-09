const TOTAL_CHARS = 26;

export const isPangram = (sentence: string): boolean => {
  const seen = new Set<string>();
  
  for (let i = 0; i < sentence.length; i++) {
    const char = sentence[i];
    if (char >= 'a' && char <= 'z') {
      seen.add(char);
      if (seen.size === TOTAL_CHARS) return true;
    } else if (char >= 'A' && char <= 'Z') {
      seen.add(char.toLowerCase());
      if (seen.size === TOTAL_CHARS) return true;
    }
  }
  
  return seen.size === TOTAL_CHARS;
};