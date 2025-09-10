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
    this._columns = this._transpose(this._rows);
  }

  /**
   * @param {string} input
   * @returns {number[][]}
   */
  _convertRows(input) {
    return input.split('\n').map(row => row.split(' ').map(number => +number));
  }

  /**
   * @param {number[][]} matrix
   * @returns {number[][]}
   */
  _transpose(matrix) {
    const numRows = matrix.length;
    const numCols = matrix[0].length;
    const transposedMatrix = Array(numCols).fill(null).map(() => Array(numRows));

    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        transposedMatrix[j][i] = matrix[i][j];
      }
    }

    return transposedMatrix;
  }

  get rows() {
    return this._rows;
  }

  get columns() {
    return this._columns;
  }
}