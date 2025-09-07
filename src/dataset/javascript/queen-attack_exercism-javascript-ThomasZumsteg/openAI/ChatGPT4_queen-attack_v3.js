class Queens {
	constructor(args) {
		this.white = (args?.white) || [0, 3];
		this.black = (args?.black) || [7, 3];
		if (this.white[0] === this.black[0] && this.white[1] === this.black[1]) {
			throw "Queens cannot share the same space";
		}
	}

	toString() {
		const board = Array.from({ length: 8 }, () => Array(8).fill("_"));
		board[this.white[0]][this.white[1]] = "W";
		board[this.black[0]][this.black[1]] = "B";
		return board.map(row => row.join(" ")).join("\n") + "\n";
	}

	canAttack() {
		const [wRow, wCol] = this.white;
		const [bRow, bCol] = this.black;
		return wRow === bRow || wCol === bCol || Math.abs(wRow - bRow) === Math.abs(wCol - bCol);
	}
}

export default Queens;