export class Matrix {
  constructor(string) {
    this._rows = this.splitInRows(string)
    this._columns = this.transposeRows(this._rows)
  }

  splitInRows(matrix) {
    return matrix.split('\n').map(row => row.split(' ').map(num => parseInt(num, 10)))
  }

  transposeRows(rows) {
    if (rows.length === 0) return []
    
    const columns = []
    const colCount = rows[0].length
    
    for (let col = 0; col < colCount; col++) {
      const column = []
      for (let row = 0; row < rows.length; row++) {
        column.push(rows[row][col])
      }
      columns.push(column)
    }
    
    return columns
  }

  get rows() {
    return this._rows
  }

  get columns() {
    return this._columns
  }
}