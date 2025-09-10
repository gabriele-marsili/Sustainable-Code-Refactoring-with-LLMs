export class Matrix {
  private readonly matrixRows: number[][];
  private readonly matrixColumns: number[][];

  constructor(matrix: string) {
    const rows = matrix.split('\n').map(row => row.split(' ').map(Number));
    const columns = rows[0]?.map((_, colIndex) => rows.map(row => row[colIndex])) || [];
    this.matrixRows = rows;
    this.matrixColumns = columns;
  }

  get rows(): number[][] {
    return this.matrixRows;
  }

  get columns(): number[][] {
    return this.matrixColumns;
  }
}