const alphabet = 'abcdefghijklmnopqrstuvwxyz';

export function isPangram(phrase: string) {
  const seen = new Set<string>();
  
  for (let i = 0; i < phrase.length; i++) {
    const char = phrase[i];
    if (char >= 'a' && char <= 'z') {
      seen.add(char);
      if (seen.size === 26) return true;
    } else if (char >= 'A' && char <= 'Z') {
      seen.add(char.toLowerCase());
      if (seen.size === 26) return true;
    }
  }
  
  return seen.size === 26;
}