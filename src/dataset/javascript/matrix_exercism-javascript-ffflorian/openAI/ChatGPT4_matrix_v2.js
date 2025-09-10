//@ts-check

export class Matrix {
  /**
   * @param {string} input
   */
  constructor(input) {
    /**
     * @private
     * @type {number[][]}
     */
    this._rows = input.split('\n').map(row => row.split(' ').map(Number));
    /**
     * @private
     * @type {number[][]}
     */
    this._columns = this._rows[0].map((_, columnIndex) => this._rows.map(row => row[columnIndex]));
  }

  get rows() {
    return this._rows;
  }

  get columns() {
    return this._columns;
  }
}