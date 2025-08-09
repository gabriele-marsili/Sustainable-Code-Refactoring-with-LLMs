const alphabet = 'abcdefghijklmnopqrstuvwxyz';

export function isPangram(phrase: string) {
  const seen = new Set<string>();
  
  for (const char of phrase) {
    const lower = char.toLowerCase();
    if (lower >= 'a' && lower <= 'z') {
      seen.add(lower);
      if (seen.size === 26) return true;
    }
  }
  
  return false;
}