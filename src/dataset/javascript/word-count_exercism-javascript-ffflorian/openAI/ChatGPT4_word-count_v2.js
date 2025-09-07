export function countWords(words) {
  const result = Object.create(null);
  words
    .toLowerCase()
    .replace(/[^\w' ,\t\n]/g, '')
    .split(/[\t\n ,]+/)
    .forEach(word => {
      if (word) {
        const cleanedWord = word.replace(/^'(.*)'$/, '$1');
        result[cleanedWord] = (result[cleanedWord] || 0) + 1;
      }
    });
  return result;
}