export function parse(phrase: string): string {
  let endIndex = phrase.indexOf(':');
  if (endIndex === -1) endIndex = phrase.length;

  let acronym = '';
  for (let i = 0; i < endIndex; i++) {
    const char = phrase[i];
    if ((i === 0 || phrase[i - 1] === ' ') && /[a-zA-Z]/.test(char)) {
      acronym += char.toUpperCase();
    }
  }
  return acronym;
}