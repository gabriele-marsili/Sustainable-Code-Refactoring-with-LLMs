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
    this._rows = this._convertRows(input);
    /**
     * @private
     * @type {number[][]}
     */
    this._columns = null;
  }

  /**
   * @param {string} input
   * @returns {number[][]}
   */
  _convertRows(input) {
    return input.split('\n').map(row => row.split(' ').map(Number));
  }

  /**
   * @param {number[][]} rows
   * @returns {number[][]}
   */
  _convertColumns(rows) {
    const numCols = rows[0].length;
    const columns = new Array(numCols);
    
    for (let col = 0; col < numCols; col++) {
      columns[col] = new Array(rows.length);
      for (let row = 0; row < rows.length; row++) {
        columns[col][row] = rows[row][col];
      }
    }
    
    return columns;
  }

  get rows() {
    return this._rows;
  }

  get columns() {
    if (this._columns === null) {
      this._columns = this._convertColumns(this._rows);
    }
    return this._columns;
  }
}