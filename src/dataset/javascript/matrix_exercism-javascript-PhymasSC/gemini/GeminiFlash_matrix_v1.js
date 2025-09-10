export class Matrix {
  #matrix;
  #rows;
  #columns;

  constructor(matrixString) {
    this.#matrix = matrixString;
  }

  get rows() {
    if (!this.#rows) {
      this.#rows = this.#matrix.split('\n').map(row => row.split(' ').map(Number));
    }
    return this.#rows;
  }

  get columns() {
    if (!this.#columns) {
      if (!this.#rows) {
        this.rows; // Ensure rows are initialized
      }
      const numRows = this.#rows.length;
      const numCols = this.#rows[0].length;
      this.#columns = Array(numCols).fill(null).map((_, colIndex) => {
        const column = Array(numRows);
        for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
          column[rowIndex] = this.#rows[rowIndex][colIndex];
        }
        return column;
      });
    }
    return this.#columns;
  }
}