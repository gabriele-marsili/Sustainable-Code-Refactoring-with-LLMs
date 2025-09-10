export default {
  ofSize(limit) {
    const result = Array(limit);
    for (let i = 0; i < limit; i++) {
      result[i] = Array(limit);
    }

    let row = 0;
    let col = 0;
    let diffRow = 0;
    let diffCol = 1;
    let upperRowBound = limit - 1;
    let lowerRowBound = 1;
    let upperColBound = limit - 1;
    let lowerColBound = 0;

    for (let n = 1; n <= limit * limit; n++) {
      result[row][col] = n;

      if (diffCol === 1 && col >= upperColBound) {
        upperColBound--;
        diffRow = 1;
        diffCol = 0;
      } else if (diffRow === 1 && row >= upperRowBound) {
        upperRowBound--;
        diffRow = 0;
        diffCol = -1;
      } else if (diffCol === -1 && col <= lowerColBound) {
        lowerColBound++;
        diffRow = -1;
        diffCol = 0;
      } else if (diffRow === -1 && row <= lowerRowBound) {
        lowerRowBound++;
        diffRow = 0;
        diffCol = 1;
      }

      row += diffRow;
      col += diffCol;
    }

    return result;
  },
};