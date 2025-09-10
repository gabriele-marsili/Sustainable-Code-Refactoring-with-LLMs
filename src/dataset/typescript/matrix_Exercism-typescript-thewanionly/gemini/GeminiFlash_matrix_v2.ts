export class Matrix {
  private matrixRows: number[][] = [];
  private matrixColumns: number[][] = [];

  constructor(matrixString: string) {
    const rows = matrixString.split('\n');
    const numRows = rows.length;

    if (numRows > 0) {
      const firstRow = rows[0].split(' ');
      const numCols = firstRow.length;
      this.matrixColumns = Array(numCols).fill(null).map(() => []);
    }

    for (let i = 0; i < numRows; i++) {
      const rowString = rows[i];
      const rowArray = rowString.split(' ').map(Number);
      this.matrixRows.push(rowArray);

      for (let j = 0; j < rowArray.length; j++) {
        this.matrixColumns[j].push(rowArray[j]);
      }
    }
  }

  get rows(): number[][] {
    return this.matrixRows.map(row => [...row]); // Return a copy to prevent modification
  }

  get columns(): number[][] {
    return this.matrixColumns.map(col => [...col]); // Return a copy to prevent modification
  }
}