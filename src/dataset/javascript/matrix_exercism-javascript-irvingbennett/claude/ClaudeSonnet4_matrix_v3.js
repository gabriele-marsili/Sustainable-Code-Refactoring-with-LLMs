export class Matrix {
  #matrix

  constructor(m) {
    this.#matrix = m.split("\n").map(row => 
      row.split(" ").map(num => parseInt(num, 10))
    );
  }

  get rows() {
    return this.#matrix.map(row => [...row]);
  }

  get columns() {
    const numCols = this.#matrix[0].length;
    const columns = new Array(numCols);
    
    for (let c = 0; c < numCols; c++) {
      columns[c] = new Array(this.#matrix.length);
      for (let r = 0; r < this.#matrix.length; r++) {
        columns[c][r] = this.#matrix[r][c];
      }
    }
    
    return columns;
  }
}