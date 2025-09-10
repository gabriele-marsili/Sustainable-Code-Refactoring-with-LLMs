export class Matrix {
  private matrixRows: number[][];
  private matrixColumns: number[][];

  constructor(matrix: string) {
    const rows = matrix.split('\n').map(row => row.split(' ').map(Number));
    this.matrixRows = rows;
    this.matrixColumns = rows[0].map((_, colIndex) => rows.map(row => row[colIndex]));
  }

  get rows(): number[][] {
    return this.matrixRows;
  }

  get columns(): number[][] {
    return this.matrixColumns;
  }
}