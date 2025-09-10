export class Matrix {
  constructor(string) {
    const rows = string.split('\n');
    this._rows = rows.map(row => row.split(' ').map(Number));
    this._columns = this.extractColumns(rows);
  }

  extractColumns(rows) {
    const numRows = rows.length;
    const numCols = rows[0].split(' ').length;
    const columns = Array(numCols).fill(null).map(() => Array(numRows));

    for (let i = 0; i < numRows; i++) {
      const rowValues = rows[i].split(' ');
      for (let j = 0; j < numCols; j++) {
        columns[j][i] = Number(rowValues[j]);
      }
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