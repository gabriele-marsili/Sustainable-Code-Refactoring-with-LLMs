export class Matrix {
  constructor(matrixString) {
    this.matrix = matrixString.split('\n').map(row =>
      row.split(' ').map(Number)
    );
  }

  get rows() {
    return this.matrix.map(row => [...row]); // Return a copy to avoid mutation
  }

  get columns() {
    if (!this.matrix || this.matrix.length === 0) {
      return [];
    }
    const numCols = this.matrix[0].length;
    const columns = [];

    for (let j = 0; j < numCols; j++) {
      const column = [];
      for (let i = 0; i < this.matrix.length; i++) {
        column.push(this.matrix[i][j]);
      }
      columns.push(column);
    }

    return columns;
  }
}