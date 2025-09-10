//
// This is only a SKELETON file for the 'Matrix' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class Matrix {
	#rows;
	#columns;
	#matrixString;

	constructor(matrix) {
		this.#matrixString = matrix;
	}

	get rows() {
		if (!this.#rows) {
			this.#rows = this.#matrixString.split("\n").map(row => row.split(" ").map(Number));
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