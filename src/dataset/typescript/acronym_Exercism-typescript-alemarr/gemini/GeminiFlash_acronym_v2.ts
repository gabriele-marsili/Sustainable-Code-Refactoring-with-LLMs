export const parse = (phrase: string): string => {
  const words = phrase.split(/[\s-]+/);
  let acronym = "";

  for (const word of words) {
    if (word.length > 0) {
      acronym += word.charAt(0).toUpperCase();
    }
  }

  return acronym;
};