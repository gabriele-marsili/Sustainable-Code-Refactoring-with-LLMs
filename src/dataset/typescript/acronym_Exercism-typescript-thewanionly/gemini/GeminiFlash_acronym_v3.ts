export function parse(phrase: string): string {
  let acronym = "";
  let wordStart = true;

  for (let i = 0; i < phrase.length; i++) {
    const char = phrase[i];

    if (/[A-Za-z]/.test(char)) {
      if (wordStart) {
        acronym += char.toUpperCase();
        wordStart = false;
      }
    } else if (!/\W/.test(char)) {
        wordStart = false;
    }
    else {
      wordStart = true;
    }
  }

  return acronym;
}