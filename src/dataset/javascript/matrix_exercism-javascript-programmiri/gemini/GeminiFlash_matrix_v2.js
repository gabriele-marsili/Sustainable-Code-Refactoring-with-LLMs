export class Matrix {
  constructor(string) {
    this._rows = this.splitInRows(string);
    this._columns = this.splitInColumns(string);
  }

  splitInRows(matrix) {
    return matrix.split('\n').map(row => row.split(' ').map(entry => parseInt(entry, 10)));
  }

  splitInColumns(matrix) {
    const rows = matrix.split('\n');
    const numRows = rows.length;
    const columns = [];

    if (numRows === 0) {
      return columns;
    }

    const numCols = rows[0].split(' ').length;

    for (let j = 0; j < numCols; j++) {
      const column = [];
      for (let i = 0; i < numRows; i++) {
        const rowValues = rows[i].split(' ');
        column.push(parseInt(rowValues[j], 10));
      }
      columns.push(column);
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