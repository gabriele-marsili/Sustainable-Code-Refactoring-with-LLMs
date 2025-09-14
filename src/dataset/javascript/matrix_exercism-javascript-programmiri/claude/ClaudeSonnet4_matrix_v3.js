export class Matrix {
  constructor(string) {
    const lines = string.split('\n');
    this._rows = lines.map(line => line.split(' ').map(num => parseInt(num, 10)));
    this._columns = this._transposeRows(this._rows);
  }

  splitInRows(matrix) {
    return matrix.split('\n').map(entry => entry.split(' ').map(entry => parseInt(entry, 10)));
  }

  splitInColumns(matrix) {
    const lines = matrix.split('\n');
    const rows = lines.map(line => line.split(' ').map(num => parseInt(num, 10)));
    return this._transposeRows(rows);
  }

  _transposeRows(rows) {
    if (rows.length === 0) return [];
    const columns = [];
    const colCount = rows[0].length;
    
    for (let col = 0; col < colCount; col++) {
      const column = [];
      for (let row = 0; row < rows.length; row++) {
        column.push(rows[row][col]);
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