/**
 * @param {number} length
 */
export function rows(length) {
  if (length === 0) return [];
  /** @type {number[][]} */
  const triangle = [[1]];
  for (let rowIndex = 1; rowIndex < length; rowIndex++) {
    const prevRow = triangle[rowIndex - 1];
    const currentRow = new Array(rowIndex + 1).fill(1);
    for (let leafIndex = 1; leafIndex < rowIndex; leafIndex++) {
      currentRow[leafIndex] = prevRow[leafIndex - 1] + prevRow[leafIndex];
    }
    triangle.push(currentRow);
  }
  return triangle;
}