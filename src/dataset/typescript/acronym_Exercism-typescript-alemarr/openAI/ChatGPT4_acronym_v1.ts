export const parse = (phrase: string): string => {
  return phrase.replace(/[^a-zA-Z]+/g, ' ')
               .split(' ')
               .map(word => word[0]?.toUpperCase() || '')
               .join('');
};