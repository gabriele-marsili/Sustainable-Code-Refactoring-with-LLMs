//@ts-check

export class Matrix {
  /**
   * @param {string} input
   */
  constructor(input) {
    const rows = input.split('\n').map(row => row.split(' ').map(Number));

    this._rows = rows;
    this._columns = this._transpose(rows);
  }


  /**
   * @private
   * @param {number[][]} matrix
   * @returns {number[][]}
   */
  _transpose(matrix) {
    if (!matrix || matrix.length === 0) {
      return [];
    }

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