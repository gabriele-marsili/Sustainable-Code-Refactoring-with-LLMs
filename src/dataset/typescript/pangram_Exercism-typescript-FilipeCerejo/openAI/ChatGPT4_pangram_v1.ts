const alphabetSet = new Set('abcdefghijklmnopqrstuvwxyz');

export function isPangram(phrase: string) {
  const seen = new Set<string>();

  for (let i = 0; i < phrase.length; i++) {
    const char = phrase[i].toLowerCase();
    if (alphabetSet.has(char)) {
      seen.add(char);
      if (seen.size === 26) return true;
    }
  }

  return false;
}