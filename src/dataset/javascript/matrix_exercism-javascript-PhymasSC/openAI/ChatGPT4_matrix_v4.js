export class Matrix {
	#rows;
	#columns;

	constructor(matrix) {
		this.#rows = matrix.split("\n").map(row => row.split(" ").map(Number));
		this.#columns = this.#rows[0].map((_, index) => this.#rows.map(row => row[index]));
	}

	get rows() {
		return this.#rows;
	}

	get columns() {
		return this.#columns;
	}
}