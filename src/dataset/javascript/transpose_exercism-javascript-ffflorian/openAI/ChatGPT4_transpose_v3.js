function trimTrailing(array) {
  let endIndex = array.length;
  while (endIndex > 0 && array[endIndex - 1] === undefined) {
    endIndex--;
  }
  return array.slice(0, endIndex);
}

export const transpose = lines => {
  const longestLine = lines.reduce((max, line) => Math.max(max, line.length), 0);
  return Array.from({ length: longestLine }, (_, col) => {
    let columnChars = '';
    let trailingIndex = -1;
    for (let row = 0; row < lines.length; row++) {
      const char = lines[row][col] || ' ';
      columnChars += char;
      if (char !== ' ') trailingIndex = columnChars.length;
    }
    return columnChars.slice(0, trailingIndex);
  });
};