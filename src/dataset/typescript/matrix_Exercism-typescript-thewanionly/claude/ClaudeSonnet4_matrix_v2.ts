export class Matrix {
  matrixRows: number[][] = []
  matrixColumns: number[][] = []

  constructor(matrix: string) {
    const rows = matrix.split('\n')
    const numCols = rows[0]?.split(' ').length || 0
    
    // Pre-allocate columns array
    this.matrixColumns = Array.from({ length: numCols }, () => [])
    
    for (let i = 0; i < rows.length; i++) {
      const rowArray = rows[i].split(' ').map(Number)
      this.matrixRows.push(rowArray)
      
      // Direct assignment instead of conditional check
      for (let j = 0; j < rowArray.length; j++) {
        this.matrixColumns[j].push(rowArray[j])
      }
    }
  }

  get rows(): number[][] {
    return this.matrixRows
  }

  get columns(): number[][] {
    return this.matrixColumns
  }
}