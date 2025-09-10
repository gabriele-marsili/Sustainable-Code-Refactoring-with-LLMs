export class Matrix {
  constructor(matrixTable) {
    this.matrixTable = matrixTable;
    this.table = this.parseMatrix(matrixTable);
  }

  parseMatrix(matrixTable) {
    return matrixTable
      .split("\n")
      .map(row => row.split(" ").map(Number));
  }

  get rows() {
    return this.table;
  }

  get columns() {
    const numRows = this.table.length;
    const numCols = numRows > 0 ? this.table[0].length : 0;

    if (numCols === 0) {
      return [];
    }

    const columns = Array(numCols).fill(null).map(() => []);

    for (let j = 0; j < numCols; j++) {
      for (let i = 0; i < numRows; i++) {
        columns[j].push(this.table[i][j]);
      }
    }

    return columns;
  }
}