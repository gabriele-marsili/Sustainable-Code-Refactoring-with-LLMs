export class Matrix {
  constructor(matrixString) {
    this.matrix_ = matrixString.split('\n').map(row =>
      row.split(' ').map(Number)
    );
  }

  get rows() {
    return this.matrix_.map(row => [...row]);
  }

  get columns() {
    const numCols = this.matrix_[0].length;
    const columns = [];
    for (let i = 0; i < numCols; i++) {
      columns.push(this.matrix_.map(row => row[i]));
    }
    return columns;
  }
}