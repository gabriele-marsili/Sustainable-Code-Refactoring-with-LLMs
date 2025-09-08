export function isIsogram(phrase: string): boolean {
  const letters = new Set<string>();
  for (const char of phrase.toLowerCase()) {
    if (/[a-z]/.test(char)) {
      if (letters.has(char)) {
        return false;
      }
      letters.add(char);
    }
  }
  return true;
}