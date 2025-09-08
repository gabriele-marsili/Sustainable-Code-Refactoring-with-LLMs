export function isIsogram(phrase: string): boolean {
  const letters = phrase.toLowerCase().replace(/[^a-z]/g, '');
  const letterSet = new Set<string>();

  for (let i = 0; i < letters.length; i++) {
    const char = letters[i];
    if (letterSet.has(char)) {
      return false;
    }
    letterSet.add(char);
  }

  return true;
}