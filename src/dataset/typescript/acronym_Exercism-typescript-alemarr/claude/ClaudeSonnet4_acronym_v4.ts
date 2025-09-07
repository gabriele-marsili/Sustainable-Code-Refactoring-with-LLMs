export const parse = (phrase: string): string => {
  let acronym = "";
  let i = 0;
  const len = phrase.length;
  
  while (i < len) {
    const char = phrase[i];
    
    if ((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z')) {
      acronym += char.toUpperCase();
      
      while (i < len && ((phrase[i] >= 'A' && phrase[i] <= 'Z') || (phrase[i] >= 'a' && phrase[i] <= 'z'))) {
        i++;
      }
    } else {
      i++;
    }
  }
  
  return acronym;
};