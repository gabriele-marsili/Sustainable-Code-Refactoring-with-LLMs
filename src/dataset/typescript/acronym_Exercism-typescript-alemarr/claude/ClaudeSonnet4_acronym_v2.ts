export const parse = (phrase: string): string => {
  let acronym = "";
  
  for (let i = 0; i < phrase.length; i++) {
    const char = phrase[i];
    if ((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z')) {
      if (i === 0 || !/[A-Za-z]/.test(phrase[i - 1])) {
        acronym += char.toUpperCase();
      }
    }
  }
  
  return acronym;
};