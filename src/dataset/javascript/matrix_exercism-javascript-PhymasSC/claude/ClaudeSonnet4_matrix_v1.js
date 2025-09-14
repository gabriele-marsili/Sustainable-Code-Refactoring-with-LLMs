//
// This is only a SKELETON file for the 'Matrix' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class Matrix {
	#rows;
	#columns;
	#rawMatrix;

	constructor(matrix) {
		this.#rawMatrix = matrix;
	}

	get rows() {
		if (!this.#rows) {
			const lines = this.#rawMatrix.split("\n");
			this.#rows = new Array(lines.length);
			for (let i = 0; i < lines.length; i++) {
				const parts = lines[i].split(" ");
				this.#rows[i] = new Array(parts.length);
				for (let j = 0; j < parts.length; j++) {
					this.#rows[i][j] = parseInt(parts[j], 10);
				}
			}
		}
		return this.#rows;
	}

	get columns() {
		if (!this.#columns) {
			const rows = this.rows;
			const numCols = rows[0].length;
			const numRows = rows.length;
			this.#columns = new Array(numCols);
			
			for (let col = 0; col < numCols; col++) {
				this.#columns[col] = new Array(numRows);
				for (let row = 0; row < numRows; row++) {
					this.#columns[col][row] = rows[row][col];
				}
			}
		}
		return this.#columns;
	}
}