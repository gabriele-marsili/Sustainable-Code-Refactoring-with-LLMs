export class Matrix {
  constructor(m) {
    this.matrix_ = m.split("\n").map(row => row.split(" ").map(Number));
  }

  get rows() {
    return this.matrix_;
  }

  get columns() {
    return this.matrix_[0].map((_, c) => this.matrix_.map(row => row[c]));
  }
}