export const parse = (phrase: string): string => {
  const matches = phrase.split(/[\s-]+/).filter(Boolean);
  let acronym = "";

  for (const match of matches) {
    acronym += match.charAt(0).toUpperCase();
  }

  return acronym;
};