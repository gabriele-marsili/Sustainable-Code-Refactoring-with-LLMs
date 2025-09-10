export class Matrix {
  constructor(matrixTable) {
    this.table = matrixTable
      .trim()
      .split("\n")
      .map(row => row.split(/\s+/).map(Number));
  }

  get rows() {
    return this.table;
  }

  get columns() {
    return this.table[0].map((_, index) => this.table.map(row => row[index]));
  }
}