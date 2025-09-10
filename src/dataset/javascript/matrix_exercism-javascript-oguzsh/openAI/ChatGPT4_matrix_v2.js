export class Matrix {
  constructor(matrixTable) {
    this.table = matrixTable
      .split("\n")
      .map(row => row.trim().split(/\s+/).map(Number));
    this._columns = null; // Cache columns for efficiency
  }

  get rows() {
    return this.table;
  }

  get columns() {
    if (!this._columns) {
      this._columns = Array.from({ length: this.table[0].length }, (_, index) =>
        this.table.map(row => row[index])
      );
    }
    return this._columns;
  }
}