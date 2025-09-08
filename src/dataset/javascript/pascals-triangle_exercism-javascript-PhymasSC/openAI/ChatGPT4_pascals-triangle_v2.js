export const rows = (number) => {
  if (number <= 0) return [];
  const res = [];
  for (let row = 0; row < number; row++) {
    const currentRow = [1];
    for (let column = 1; column < row; column++) {
      currentRow.push(res[row - 1][column - 1] + res[row - 1][column]);
    }
    if (row > 0) currentRow.push(1);
    res.push(currentRow);
  }
  return res;
};