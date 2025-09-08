export const rows = (n) => {
  if (n === 0) return [];
  
  const triangle = [[1]];
  
  for (let i = 1; i < n; i++) {
    const prevRow = triangle[i - 1];
    const newRow = new Array(i + 1);
    
    newRow[0] = 1;
    newRow[i] = 1;
    
    for (let j = 1; j < i; j++) {
      newRow[j] = prevRow[j - 1] + prevRow[j];
    }
    
    triangle.push(newRow);
  }
  
  return triangle;
};