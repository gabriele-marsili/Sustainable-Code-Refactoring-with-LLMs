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
  
  const result = new Array(longestLine);
  for (let col = 0; col < longestLine; col++) {
    const column = new Array(lines.length);
    for (let row = 0; row < lines.length; row++) {
      column[row] = lines[row][col];
    }
    
    let lastIndex = column.length - 1;
    while (lastIndex >= 0 && column[lastIndex] === undefined) {
      lastIndex--;
    }
    
    let str = '';
    for (let i = 0; i <= lastIndex; i++) {
      str += column[i] || ' ';
    }
    result[col] = str;
  }
  
  return result;
};