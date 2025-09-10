function trimTrailing(array) {
  let i = array.length;
  while (i > 0 && array[i - 1] === undefined) i--;
  return array.slice(0, i);
}

export const transpose = lines => {
  const longestLine = lines.reduce((max, line) => Math.max(max, line.length), 0);
  return Array.from({ length: longestLine }, (_, col) =>
    trimTrailing(lines.map(line => line[col]))
      .map(char => char || ' ')
      .join('')
  );
};