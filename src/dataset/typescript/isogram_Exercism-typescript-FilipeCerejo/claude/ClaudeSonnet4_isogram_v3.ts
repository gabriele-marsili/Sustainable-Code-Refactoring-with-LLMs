export function isIsogram(phrase: string): boolean {
  const seen = new Set<string>();
  
  for (let i = 0; i < phrase.length; i++) {
    const char = phrase[i];
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