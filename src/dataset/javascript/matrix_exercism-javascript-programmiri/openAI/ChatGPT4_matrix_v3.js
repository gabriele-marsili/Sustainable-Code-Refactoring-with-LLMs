export class Matrix {
  constructor(string) {
    this._rows = this.splitInRows(string);
    this._columns = this.transpose(this._rows);
  }

  splitInRows(matrix) {
    return matrix.split('\n').map(row => row.split(' ').map(Number));
  }

  transpose(rows) {
    return rows[0].map((_, colIndex) => rows.map(row => row[colIndex]));
  }

  get rows() {
    return this._rows;
  }

  get columns() {
    return this._columns;
  }
}