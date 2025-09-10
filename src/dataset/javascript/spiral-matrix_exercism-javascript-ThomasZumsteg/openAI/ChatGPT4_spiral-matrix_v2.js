export default {
  ofSize(limit) {
    const result = Array.from({ length: limit }, () => Array(limit).fill(null));
    let row = 0, col = 0, value = 1;
    let rowStart = 0, rowEnd = limit - 1, colStart = 0, colEnd = limit - 1;

    while (value <= limit * limit) {
      for (col = colStart; col <= colEnd; col++) result[rowStart][col] = value++;
      rowStart++;
      for (row = rowStart; row <= rowEnd; row++) result[row][colEnd] = value++;
      colEnd--;
      for (col = colEnd; col >= colStart; col--) result[rowEnd][col] = value++;
      rowEnd--;
      for (row = rowEnd; row >= rowStart; row--) result[row][colStart] = value++;
      colStart++;
    }

    return result;
  },
};