export const rows = number => {
  if (number <= 0) return [];

  const triangle = [];
  for (let i = 0; i < number; i++) {
    const row = new Array(i + 1);
    row[0] = 1;
    row[i] = 1;

    if (i > 1) {
      for (let j = 1; j < i; j++) {
        row[j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
      }
    }
    triangle.push(row);
  }
  return triangle;
};