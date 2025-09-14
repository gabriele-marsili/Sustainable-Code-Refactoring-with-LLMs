export class Matrix {
  matrixRows: number[][] = []
  matrixColumns: number[][] = []

  constructor(matrix: string) {
    const rows = matrix.split('\n')
    const numCols = rows[0]?.split(' ').length || 0
    
    this.matrixRows = new Array(rows.length)
    this.matrixColumns = new Array(numCols)
    
    for (let i = 0; i < numCols; i++) {
      this.matrixColumns[i] = new Array(rows.length)
    }

    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      const values = rows[rowIndex].split(' ')
      const rowArray = new Array(values.length)
      
      for (let colIndex = 0; colIndex < values.length; colIndex++) {
        const value = Number(values[colIndex])
        rowArray[colIndex] = value
        this.matrixColumns[colIndex][rowIndex] = value
      }
      
      this.matrixRows[rowIndex] = rowArray
    }
  }

  get rows(): number[][] {
    return this.matrixRows
  }

  get columns(): number[][] {
    return this.matrixColumns
  }
}