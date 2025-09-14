export class Matrix {
  constructor(string) {
    const lines = string.split('\n');
    this._rows = lines.map(line => line.split(' ').map(num => parseInt(num, 10)));
    
    if (this._rows.length === 0 || this._rows[0].length === 0) {
      this._columns = [];
      return;
    }
    
    const numCols = this._rows[0].length;
    this._columns = new Array(numCols);
    
    for (let col = 0; col < numCols; col++) {
      this._columns[col] = new Array(this._rows.length);
      for (let row = 0; row < this._rows.length; row++) {
        this._columns[col][row] = this._rows[row][col];
      }
    }
  }

  splitInRows(matrix) {
    return matrix.split('\n').map(entry => entry.split(' ').map(entry => parseInt(entry, 10)));
  }

  splitInColumns(matrix) {
    const firstLineNumber = /^([0-9]+)/gm;
    const leadingWhitespace = /^[ \t]+/gm;
    const columns = [];

    let matrixToWorkOn = matrix;

    while (matrixToWorkOn.trim().length) {
      const column = matrixToWorkOn.match(firstLineNumber).map(entry => parseInt(entry, 10));
      columns.push([...column]);

      matrixToWorkOn = matrixToWorkOn.replace(firstLineNumber, '').replace(leadingWhitespace, '');
    }
    return columns;
  }

  get rows() {
    return this._rows;
  }

  get columns() {
    return this._columns;
  }
}