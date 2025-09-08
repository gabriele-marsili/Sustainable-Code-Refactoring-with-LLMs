export function isIsogram(phrase: string): boolean {
  const seen = new Set<string>();
  for (const char of phrase.toLowerCase()) {
    if (/\w/.test(char)) {
      if (seen.has(char)) return false;
      seen.add(char);
    }
  }
  return true;
}