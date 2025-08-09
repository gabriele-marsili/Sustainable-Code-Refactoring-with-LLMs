const alphabetLength = 26;

export function isPangram(phrase: string) {
  const seen = new Set<number>();
  for (let i = 0; i < phrase.length; i++) {
    const code = phrase.charCodeAt(i) | 32;
    if (code >= 97 && code <= 122) {
      seen.add(code);
      if (seen.size === alphabetLength) return true;
    }
  }
  return false;
}