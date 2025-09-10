export class Matrix {
  constructor(matrixTable) {
    this.table = matrixTable
      .split("\n")
      .map(row => row.split(" ").map(Number));
  }

  get rows() {
    return this.table;
  }

  get columns() {
    if (!this.table || this.table.length === 0) {
      return [];
    }

    const numRows = this.table.length;
    const numCols = this.table[0].length;
    const columns = Array(numCols).fill(null).map(() => Array(numRows));

    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        columns[j][i] = this.table[i][j];
      }
    }

    return columns;
  }
}