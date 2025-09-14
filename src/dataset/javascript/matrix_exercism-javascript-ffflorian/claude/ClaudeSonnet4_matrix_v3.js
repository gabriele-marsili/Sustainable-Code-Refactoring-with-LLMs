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
    const lines = input.split('\n');
    const rows = new Array(lines.length);
    
    for (let i = 0; i < lines.length; i++) {
      const numbers = lines[i].split(' ');
      const row = new Array(numbers.length);
      
      for (let j = 0; j < numbers.length; j++) {
        row[j] = parseInt(numbers[j], 10);
      }
      
      rows[i] = row;
    }
    
    return rows;
  }

  /**
   * @param {number[][]} rows
   * @returns {number[][]}
   */
  _convertColumns(rows) {
    if (rows.length === 0) return [];
    
    const numCols = rows[0].length;
    const columns = new Array(numCols);
    
    for (let col = 0; col < numCols; col++) {
      const column = new Array(rows.length);
      
      for (let row = 0; row < rows.length; row++) {
        column[row] = rows[row][col];
      }
      
      columns[col] = column;
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