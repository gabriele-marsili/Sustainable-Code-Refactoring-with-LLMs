function trimTrailing(array) {
  let lastIndex = array.length - 1;
  while (lastIndex >= 0 && array[lastIndex] === undefined) {
    lastIndex--;
  }
  return array.slice(0, lastIndex + 1);
}

export const transpose = lines => {
  if (lines.length === 0) return [];
  
  let longestLine = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].length > longestLine) {
      longestLine = lines[i].length;
    }
  }
  
  const result = [];
  for (let col = 0; col < longestLine; col++) {
    const column = [];
    for (let row = 0; row < lines.length; row++) {
      column.push(lines[row][col]);
    }
    
    const trimmed = trimTrailing(column);
    let columnStr = '';
    for (let i = 0; i < trimmed.length; i++) {
      columnStr += trimmed[i] || ' ';
    }
    result.push(columnStr);
  }
  
  return result;
};