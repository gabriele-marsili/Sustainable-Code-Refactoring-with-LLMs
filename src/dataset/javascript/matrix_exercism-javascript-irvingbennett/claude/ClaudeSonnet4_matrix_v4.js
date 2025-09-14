export class Matrix {
  constructor(m) {
    this.matrix_ = m.split("\n").map(row => row.split(" ").map(Number));
  }

  get rows() {
    return this.matrix_.map(row => [...row]);
  }

  get columns() {
    const numCols = this.matrix_[0].length;
    const columns = new Array(numCols);
    
    for (let c = 0; c < numCols; c++) {
      columns[c] = new Array(this.matrix_.length);
      for (let r = 0; r < this.matrix_.length; r++) {
        columns[c][r] = this.matrix_[r][c];
      }
    }
    
    return columns;
  }
}