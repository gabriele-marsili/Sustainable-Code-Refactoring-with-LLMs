export class Matrix {
  matrixRows: number[][] = []
  matrixColumns: number[][] = []

  constructor(matrix: string) {
    const rows = matrix.split('\n')
    const numCols = rows[0]?.split(' ').length || 0
    
    // Pre-allocate columns array
    this.matrixColumns = Array.from({ length: numCols }, () => [])
    
    for (let i = 0; i < rows.length; i++) {
      const rowValues = rows[i].split(' ')
      const rowArray = new Array(rowValues.length)
      
      for (let j = 0; j < rowValues.length; j++) {
        const value = Number(rowValues[j])
        rowArray[j] = value
        this.matrixColumns[j].push(value)
      }
      
      this.matrixRows.push(rowArray)
    }
  }

  get rows(): number[][] {
    return this.matrixRows
  }

  get columns(): number[][] {
    return this.matrixColumns
  }
}