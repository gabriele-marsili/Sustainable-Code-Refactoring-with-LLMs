export function isIsogram(word: string): boolean {
  const cleanWord = word.toLowerCase().replace(/\W/g, '');
  const charSet = new Set<string>();

  for (let i = 0; i < cleanWord.length; i++) {
    const char = cleanWord[i];
    if (charSet.has(char)) {
      return false;
    }
    charSet.add(char);
  }

  return true;
}