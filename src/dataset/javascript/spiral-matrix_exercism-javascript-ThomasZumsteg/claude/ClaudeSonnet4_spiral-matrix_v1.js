export default {
  ofSize(limit) {
    if (limit <= 0) return [];
    if (limit === 1) return [[1]];

    const result = Array(limit);
    for (let i = 0; i < limit; i++) {
      result[i] = Array(limit);
    }

    let row = 0, col = 0;
    let rowDir = 0, colDir = 1;
    let topBound = 0, rightBound = limit - 1, bottomBound = limit - 1, leftBound = 0;

    for (let n = 1; n <= limit * limit; n++) {
      result[row][col] = n;

      if (colDir === 1 && col === rightBound) {
        topBound++;
        rowDir = 1;
        colDir = 0;
      } else if (rowDir === 1 && row === bottomBound) {
        rightBound--;
        rowDir = 0;
        colDir = -1;
      } else if (colDir === -1 && col === leftBound) {
        bottomBound--;
        rowDir = -1;
        colDir = 0;
      } else if (rowDir === -1 && row === topBound) {
        leftBound++;
        rowDir = 0;
        colDir = 1;
      }

      row += rowDir;
      col += colDir;
    }

    return result;
  },
};