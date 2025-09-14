export class Matrix {

  classRows: number[][];
  classColumns: number[][];
  
  constructor(strMatrix: string) {
    const rowsStr = strMatrix.split('\n');
    const numRows = rowsStr.length;
    const numCols = rowsStr[0].split(' ').length;
    
    this.classRows = new Array(numRows);
    this.classColumns = new Array(numCols);
    
    // Initialize columns array
    for (let i = 0; i < numCols; i++) {
      this.classColumns[i] = new Array(numRows);
    }
    
    // Single pass to populate both rows and columns
    for (let rowIdx = 0; rowIdx < numRows; rowIdx++) {
      const row = rowsStr[rowIdx].split(' ');
      const numRow = new Array(row.length);
      
      for (let colIdx = 0; colIdx < row.length; colIdx++) {
        const value = Number(row[colIdx]);
        numRow[colIdx] = value;
        this.classColumns[colIdx][rowIdx] = value;
      }
      
      this.classRows[rowIdx] = numRow;
    }
  }

  get rows(): number[][] {
    return this.classRows;
  }

  get columns(): number[][] {
    return this.classColumns;
  }
}