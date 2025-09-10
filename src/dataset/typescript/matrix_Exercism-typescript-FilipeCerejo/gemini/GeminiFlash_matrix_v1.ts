export class Matrix {

  private rowsData: number[][];
  private columnsData: number[][];

  constructor(strMatrix: string) {
    const rowsStr = strMatrix.split('\n');
    this.rowsData = rowsStr.map(rs => rs.split(' ').map(Number));
    
    const numRows = this.rowsData.length;
    if (numRows === 0) {
        this.columnsData = [];
        return;
    }
    const numCols = this.rowsData[0].length;
    this.columnsData = Array(numCols).fill(null).map(() => Array(numRows));

    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        this.columnsData[j][i] = this.rowsData[i][j];
      }
    }
  }

  get rows(): number[][] {
    return this.rowsData.map(row => [...row]); // Defensive copy
  }

  get columns(): number[][] {
    return this.columnsData.map(col => [...col]); // Defensive copy
  }
}