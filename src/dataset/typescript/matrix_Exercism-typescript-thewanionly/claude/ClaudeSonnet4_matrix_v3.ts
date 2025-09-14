export class Matrix {
  private matrixRows: number[][] = []
  private matrixColumns: number[][] = []

  constructor(matrix: string) {
    const rows = matrix.split('\n')
    const numCols = rows[0]?.split(' ').length || 0
    
    this.matrixRows = new Array(rows.length)
    this.matrixColumns = new Array(numCols).fill(null).map(() => new Array(rows.length))

    for (let i = 0; i < rows.length; i++) {
      const rowArray = rows[i].split(' ').map(Number)
      this.matrixRows[i] = rowArray
      
      for (let j = 0; j < rowArray.length; j++) {
        this.matrixColumns[j][i] = rowArray[j]
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