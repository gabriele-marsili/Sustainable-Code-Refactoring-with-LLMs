class Matrix {
  constructor(matrix) {
    const rows = matrix.split("\n").map(row => row.split(" ").map(Number));
    this.rows = rows;
    this.columns = Array.from({ length: rows[0].length }, (_, colNum) =>
      rows.map(row => row[colNum])
    );
  }
}

export default Matrix;