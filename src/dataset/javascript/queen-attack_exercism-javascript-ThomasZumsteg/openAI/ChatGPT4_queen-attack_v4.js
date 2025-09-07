class Queens {
	constructor(args) {
		this.white = args?.white || [0, 3];
		this.black = args?.black || [7, 3];
		if (this.white[0] === this.black[0] && this.white[1] === this.black[1]) {
			throw new Error("Queens cannot share the same space");
		}
	}

	toString() {
		const board = Array.from({ length: 8 }, () => Array(8).fill("_"));
		board[this.white[0]][this.white[1]] = "W";
		board[this.black[0]][this.black[1]] = "B";
		return board.map(row => row.join(" ")).join("\n") + "\n";
	}

	canAttack() {
		const [dx, dy] = [Math.abs(this.black[0] - this.white[0]), Math.abs(this.black[1] - this.white[1])];
		return dx === 0 || dy === 0 || dx === dy;
	}
}

export default Queens;