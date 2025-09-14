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
      const numCols = this.table[0].length;
      this._columns = new Array(numCols);
      
      for (let col = 0; col < numCols; col++) {
        this._columns[col] = new Array(this.table.length);
        for (let row = 0; row < this.table.length; row++) {
          this._columns[col][row] = this.table[row][col];
        }
      }
    }
    return this._columns;
  }
}