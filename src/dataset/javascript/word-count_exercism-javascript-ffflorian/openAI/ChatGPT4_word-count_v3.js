export function countWords(words) {
  const result = Object.create(null);
  words
    .trim()
    .toLowerCase()
    .replace(/[^\w' ,]/g, '')
    .split(/[\t\n ,]+/)
    .forEach(word => {
      if (word) {
        const cleanWord = word.replace(/^'(.*)'$/, '$1');
        result[cleanWord] = (result[cleanWord] || 0) + 1;
      }
    });
  return result;
}