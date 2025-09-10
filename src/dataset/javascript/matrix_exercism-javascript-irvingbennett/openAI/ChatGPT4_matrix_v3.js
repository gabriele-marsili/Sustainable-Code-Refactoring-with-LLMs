export class Matrix {
  constructor(matrixString) {
    this.matrix_ = matrixString.split("\n").map(row => row.split(" ").map(Number));
  }

  get rows() {
    return this.matrix_;
  }

  get columns() {
    return this.matrix_[0].map((_, colIndex) => this.matrix_.map(row => row[colIndex]));
  }
}