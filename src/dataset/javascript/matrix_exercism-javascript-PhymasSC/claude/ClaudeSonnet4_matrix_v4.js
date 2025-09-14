export class Matrix {
	#rows;
	#columns;
	#parsedMatrix;

	constructor(matrix) {
		this.#parsedMatrix = matrix.split("\n").map(row => row.split(" ").map(Number));
	}

	get rows() {
		if (!this.#rows) {
			this.#rows = this.#parsedMatrix;
		}
		return this.#rows;
	}

	get columns() {
		if (!this.#columns) {
			const numCols = this.#parsedMatrix[0].length;
			const numRows = this.#parsedMatrix.length;
			this.#columns = new Array(numCols);
			
			for (let col = 0; col < numCols; col++) {
				this.#columns[col] = new Array(numRows);
				for (let row = 0; row < numRows; row++) {
					this.#columns[col][row] = this.#parsedMatrix[row][col];
				}
			}
		}
		return this.#columns;
	}
}