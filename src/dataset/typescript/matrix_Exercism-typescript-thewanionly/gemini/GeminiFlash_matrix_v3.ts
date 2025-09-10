export class Matrix {
  private matrixRows: number[][] = [];
  private matrixColumns: number[][] = [];

  constructor(matrix: string) {
    const rows = matrix.split('\n');
    const numRows = rows.length;

    if (numRows > 0) {
      const firstRow = rows[0].split(' ');
      const numCols = firstRow.length;
      this.matrixColumns = Array(numCols).fill(null).map(() => []);

      for (let i = 0; i < numRows; i++) {
        const row = rows[i];
        const rowArray = row.split(' ').map(Number);
        this.matrixRows.push(rowArray);

        for (let j = 0; j < numCols; j++) {
          this.matrixColumns[j].push(rowArray[j]);
        }
      }
    }
  }

  get rows(): number[][] {
    return this.matrixRows;
  }

  get columns(): number[][] {
    return this.matrixColumns;
  }
}