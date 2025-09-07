export const parse = (phrase: string): string => 
  (phrase.match(/\b\w/g) || []).map(char => char.toUpperCase()).join('');