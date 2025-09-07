export const parse = (phrase: string): string => {
  const matches = phrase.match(/[A-Z]+[a-z]*|[a-z]+/g);
  
  if (!matches) return "";
  
  let acronym = "";
  for (let i = 0; i < matches.length; i++) {
    acronym += matches[i][0].toUpperCase();
  }
  
  return acronym;
};