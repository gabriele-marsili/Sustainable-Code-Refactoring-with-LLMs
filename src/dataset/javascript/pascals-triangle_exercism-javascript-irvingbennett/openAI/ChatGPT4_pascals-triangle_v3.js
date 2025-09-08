export const rows = (n) => {
  if (n === 0) return [];
  
  const triangle = [[1]];
  
  for (let r = 1; r < n; r++) {
    const prevRow = triangle[r - 1];
    const newRow = [1];
    
    for (let x = 1; x < r; x++) {
      newRow.push(prevRow[x - 1] + prevRow[x]);
    }
    
    newRow.push(1);
    triangle.push(newRow);
  }
  
  return triangle;
};