/**
 * @param {number} length
 */
export function rows(length) {
  if (length <= 0) {
    return [];
  }

  const triangle = [[1]];

  for (let i = 1; i < length; i++) {
    const currentRow = [1];
    const previousRow = triangle[i - 1];

    for (let j = 1; j < i; j++) {
      currentRow[j] = previousRow[j - 1] + previousRow[j];
    }

    currentRow.push(1);
    triangle.push(currentRow);
  }

  return triangle;
}