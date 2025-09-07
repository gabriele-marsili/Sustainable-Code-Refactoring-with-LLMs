export function parse(phrase: string): string {
  const words = phrase.toUpperCase().split(/[^A-Z]/).filter(Boolean);
  let acronym = "";
  for (const word of words) {
    acronym += word.charAt(0);
  }
  return acronym;
}