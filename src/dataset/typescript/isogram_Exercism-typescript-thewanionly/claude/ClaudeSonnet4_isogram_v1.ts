export function isIsogram(word: string): boolean {
  const seen = new Set<string>();
  
  for (let i = 0; i < word.length; i++) {
    const char = word[i];
    if (/\w/.test(char)) {
      const lowerChar = char.toLowerCase();
      if (seen.has(lowerChar)) {
        return false;
      }
      seen.add(lowerChar);
    }
  }
  
  return true;
}