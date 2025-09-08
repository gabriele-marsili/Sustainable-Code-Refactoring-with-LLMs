export function isIsogram(word: string): boolean {
  const cleanedWord = word.toLowerCase().replace(/\W/g, '');
  const charSet = new Set<string>();

  for (let i = 0; i < cleanedWord.length; i++) {
    const char = cleanedWord[i];
    if (charSet.has(char)) {
      return false;
    }
    charSet.add(char);
  }

  return true;
}