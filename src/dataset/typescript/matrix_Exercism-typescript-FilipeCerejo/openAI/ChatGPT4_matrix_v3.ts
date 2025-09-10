export class Matrix {
  private classRows: number[][];
  private classColumns: number[][];

  constructor(strMatrix: string) {
    this.classRows = strMatrix.split('\n').map(row => row.split(' ').map(Number));
    this.classColumns = this.classRows[0].map((_, colIdx) => this.classRows.map(row => row[colIdx]));
  }

  get rows(): number[][] {
    return this.classRows;
  }

  get columns(): number[][] {
    return this.classColumns;
  }
}