export class Matrix {

  private classRows: number[][];
  private classColumns: number[][];

  constructor(strMatrix: string) {
    const rowsStr = strMatrix.split('\n');
    this.classRows = rowsStr.map(rs => rs.split(' ').map(Number));

    const numRows = this.classRows.length;
    if (numRows === 0) {
        this.classColumns = [];
        return;
    }
    const numCols = this.classRows[0].length;
    this.classColumns = Array(numCols).fill(null).map(() => []);

    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        this.classColumns[j].push(this.classRows[i][j]);
      }
    }
  }

  get rows(): number[][] {
    return this.classRows;
  }

  get columns(): number[][] {
    return this.classColumns;
  }
}