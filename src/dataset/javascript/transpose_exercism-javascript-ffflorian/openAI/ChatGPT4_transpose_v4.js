function trimTrailing(array) {
  let end = array.length;
  while (end > 0 && array[end - 1] === undefined) {
    end--;
  }
  return array.slice(0, end);
}

export const transpose = lines => {
  const longestLine = lines.reduce((max, line) => Math.max(max, line.length), 0);
  const result = Array.from({ length: longestLine }, (_, col) => {
    let column = '';
    let trailingIndex = -1;
    for (let row = 0; row < lines.length; row++) {
      const char = lines[row][col] || ' ';
      column += char;
      if (char !== ' ') trailingIndex = column.length;
    }
    return column.slice(0, trailingIndex);
  });
  return result;
};