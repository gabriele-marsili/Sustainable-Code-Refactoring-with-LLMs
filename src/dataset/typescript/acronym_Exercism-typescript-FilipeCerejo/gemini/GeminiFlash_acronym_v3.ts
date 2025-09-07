export function parse(phrase: string): string {
  const words = phrase.split(/[\s:]+/);
  let acronym = "";
  for (const word of words) {
    if (word) {
      acronym += word[0].toUpperCase();
    }
  }
  return acronym;
}