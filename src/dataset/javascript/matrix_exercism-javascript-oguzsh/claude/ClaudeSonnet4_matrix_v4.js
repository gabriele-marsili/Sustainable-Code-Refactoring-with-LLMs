export class Matrix {
  constructor(matrixTable) {
    this.table = matrixTable
      .split("\n")
      .map(row => row.split(" ").map(Number));
    this._columns = null;
  }

  get rows() {
    return this.table;
  }

  get columns() {
    if (this._columns === null) {
      const colCount = this.table[0].length;
      const rowCount = this.table.length;
      this._columns = new Array(colCount);
      
      for (let col = 0; col < colCount; col++) {
        this._columns[col] = new Array(rowCount);
        for (let row = 0; row < rowCount; row++) {
          this._columns[col][row] = this.table[row][col];
        }
      }
    }
    return this._columns;
  }
}