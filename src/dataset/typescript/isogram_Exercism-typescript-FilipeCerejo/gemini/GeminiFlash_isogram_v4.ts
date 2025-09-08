export function isIsogram(phrase: string): boolean {
  const cleanedPhrase = phrase.toLowerCase().replace(/[^a-z]/g, '');
  const letterSet = new Set<string>();

  for (let i = 0; i < cleanedPhrase.length; i++) {
    const char = cleanedPhrase[i];
    if (letterSet.has(char)) {
      return false;
    }
    letterSet.add(char);
  }

  return true;
}