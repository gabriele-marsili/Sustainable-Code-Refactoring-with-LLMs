export class Matrix {
	#rows;
	#columns;
	#matrix;

	constructor(matrix) {
		this.#matrix = matrix;
	}

	get rows() {
		if (!this.#rows) {
			const lines = this.#matrix.split("\n");
			this.#rows = new Array(lines.length);
			for (let i = 0; i < lines.length; i++) {
				const parts = lines[i].split(" ");
				this.#rows[i] = new Array(parts.length);
				for (let j = 0; j < parts.length; j++) {
					this.#rows[i][j] = +parts[j];
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
			
			for (let j = 0; j < numCols; j++) {
				this.#columns[j] = new Array(numRows);
				for (let i = 0; i < numRows; i++) {
					this.#columns[j][i] = rows[i][j];
				}
			}
		}
		return this.#columns;
	}
}