const TOTAL_CHARS = 26;

export const isPangram = (sentence: string): boolean => {
  const seen = new Set<number>();
  for (let i = 0, len = sentence.length; i < len; i++) {
    const code = sentence.charCodeAt(i) | 32;
    if (code >= 97 && code <= 122) {
      seen.add(code);
      if (seen.size === TOTAL_CHARS) return true;
    }
  }
  return false;
};