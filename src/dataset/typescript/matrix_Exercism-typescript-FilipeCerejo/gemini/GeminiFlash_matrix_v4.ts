export class Matrix {

  private classRows: number[][];
  private classColumns: number[][];

  constructor(strMatrix: string) {
    const rowsStr = strMatrix.split('\n');
    this.classRows = rowsStr.map(rs => rs.split(' ').map(Number));
    const numRows = this.classRows.length;
    if (numRows > 0) {
      const numCols = this.classRows[0].length;
      this.classColumns = Array(numCols).fill(null).map(() => Array<number>());

      for (let colIdx = 0; colIdx < numCols; colIdx++) {
        for (let rowIdx = 0; rowIdx < numRows; rowIdx++) {
          this.classColumns[colIdx].push(this.classRows[rowIdx][colIdx]);
        }
      }
    } else {
      this.classColumns = [];
    }
  }

  get rows(): number[][] {
    return this.classRows;
  }

  get columns(): number[][] {
    return this.classColumns;
  }
}