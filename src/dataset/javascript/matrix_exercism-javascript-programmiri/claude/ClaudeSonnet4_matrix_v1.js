export class Matrix {
  constructor(string) {
    this._rows = this.splitInRows(string)
    this._columns = this.transposeRows(this._rows)
  }

  splitInRows(matrix) {
    const lines = matrix.split('\n')
    const rows = new Array(lines.length)
    
    for (let i = 0; i < lines.length; i++) {
      const entries = lines[i].split(' ')
      const row = new Array(entries.length)
      for (let j = 0; j < entries.length; j++) {
        row[j] = parseInt(entries[j], 10)
      }
      rows[i] = row
    }
    
    return rows
  }

  transposeRows(rows) {
    if (rows.length === 0) return []
    
    const numCols = rows[0].length
    const columns = new Array(numCols)
    
    for (let j = 0; j < numCols; j++) {
      const column = new Array(rows.length)
      for (let i = 0; i < rows.length; i++) {
        column[i] = rows[i][j]
      }
      columns[j] = column
    }
    
    return columns
  }

  splitInColumns(matrix) {
    return this.transposeRows(this.splitInRows(matrix))
  }

  get rows() {
    return this._rows
  }

  get columns() {
    return this._columns
  }
}