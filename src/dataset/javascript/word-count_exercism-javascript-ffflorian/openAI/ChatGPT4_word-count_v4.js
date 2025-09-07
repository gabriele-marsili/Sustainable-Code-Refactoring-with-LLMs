export function countWords(words) {
  const result = Object.create(null);
  words
    .toLowerCase()
    .replace(/[^\w' ,]/g, '')
    .split(/[\t\n ,]+/)
    .forEach(word => {
      if (word) {
        const cleanWord = word.startsWith("'") && word.endsWith("'") ? word.slice(1, -1) : word;
        result[cleanWord] = (result[cleanWord] || 0) + 1;
      }
    });
  return result;
}