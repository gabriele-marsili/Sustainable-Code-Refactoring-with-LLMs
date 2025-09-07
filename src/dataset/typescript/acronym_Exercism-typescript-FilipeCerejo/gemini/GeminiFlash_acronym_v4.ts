export function parse(phrase: string): string {
  const words = phrase.split(/[\s:_-]+/);
  let acronym = "";
  for (const word of words) {
    if (word.length > 0) {
      acronym += word[0].toUpperCase();
    }
  }
  return acronym;
}