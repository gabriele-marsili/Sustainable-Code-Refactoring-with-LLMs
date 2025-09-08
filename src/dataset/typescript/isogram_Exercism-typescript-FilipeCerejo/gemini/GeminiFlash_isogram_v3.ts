export function isIsogram(phrase: string): boolean {
  const letters = phrase.toLowerCase();
  const seen = new Set<string>();

  for (let i = 0; i < letters.length; i++) {
    const char = letters[i];
    if (/[a-z]/.test(char)) {
      if (seen.has(char)) {
        return false;
      }
      seen.add(char);
    }
  }

  return true;
}