/**
 * @param {number} length
 */
export function rows(length) {
  if (length === 0) return [];
  const triangle = [[1]];
  for (let rowIndex = 1; rowIndex < length; rowIndex++) {
    const prevRow = triangle[rowIndex - 1];
    const newRow = Array(rowIndex + 1);
    newRow[0] = newRow[rowIndex] = 1;
    for (let leafIndex = 1; leafIndex < rowIndex; leafIndex++) {
      newRow[leafIndex] = prevRow[leafIndex - 1] + prevRow[leafIndex];
    }
    triangle.push(newRow);
  }
  return triangle;
}