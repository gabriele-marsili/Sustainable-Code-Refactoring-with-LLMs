export const parse = (phrase: string): string => {
  let acronym = "";
  const words = phrase.split(/[\s-]+/);

  for (const word of words) {
    if (word.length > 0) {
      acronym += word.charAt(0).toUpperCase();
    }
  }

  return acronym;
};