export class Matrix {
  constructor(string) {
    this._rows = this.splitInRows(string);
    this._columns = this.splitInColumns(string);
  }

  splitInRows(matrix) {
    return matrix.split('\n').map(row => row.split(' ').map(Number));
  }

  splitInColumns(matrix) {
    const rows = matrix.split('\n');
    const numRows = rows.length;
    const numCols = rows[0].split(' ').length;
    const columns = Array.from({ length: numCols }, () => []);

    for (let i = 0; i < numRows; i++) {
      const rowValues = rows[i].split(' ');
      for (let j = 0; j < numCols; j++) {
        columns[j].push(Number(rowValues[j]));
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