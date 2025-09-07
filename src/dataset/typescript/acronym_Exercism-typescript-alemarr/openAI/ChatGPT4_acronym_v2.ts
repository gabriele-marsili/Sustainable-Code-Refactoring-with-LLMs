export const parse = (phrase: string): string => {
  return phrase
    .match(/\b\w/g)
    ?.map(char => char.toUpperCase())
    .join('') || '';
};