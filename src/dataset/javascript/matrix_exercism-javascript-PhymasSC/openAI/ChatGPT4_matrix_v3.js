export class Matrix {
	#rows;
	#columns;

	constructor(matrix) {
		this.#rows = matrix.split("\n").map(row => row.split(" ").map(Number));
	}

	get rows() {
		return this.#rows;
	}

	get columns() {
		if (!this.#columns) {
			this.#columns = Array.from({ length: this.#rows[0].length }, (_, colIndex) =>
				this.#rows.map(row => row[colIndex])
			);
		}
		return this.#columns;
	}
}