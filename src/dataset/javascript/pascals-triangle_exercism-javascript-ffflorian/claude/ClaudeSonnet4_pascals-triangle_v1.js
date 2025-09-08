/**
 * @param {number} length
 */
export function rows(length) {
  if (length === 0) return [];
  
  /** @type {number[][]} */
  const triangle = new Array(length);
  
  for (let rowIndex = 0; rowIndex < length; rowIndex++) {
    const row = new Array(rowIndex + 1);
    row[0] = 1;
    row[rowIndex] = 1;
    
    for (let leafIndex = 1; leafIndex < rowIndex; leafIndex++) {
      row[leafIndex] = triangle[rowIndex - 1][leafIndex - 1] + triangle[rowIndex - 1][leafIndex];
    }
    
    triangle[rowIndex] = row;
  }
  
  return triangle;
}