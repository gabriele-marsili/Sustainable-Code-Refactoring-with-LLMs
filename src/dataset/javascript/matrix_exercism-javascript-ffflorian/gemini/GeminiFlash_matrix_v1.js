//@ts-check

export class Matrix {
  /**
   * @param {string} input
   */
  constructor(input) {
    const rows = input.split('\n').map(row => row.split(' ').map(Number));

    this._rows = rows;
    this._columns = rows[0].map((_, i) => rows.map(row => row[i]));
  }

  get rows() {
    return this._rows;
  }

  get columns() {
    return this._columns;
  }
}