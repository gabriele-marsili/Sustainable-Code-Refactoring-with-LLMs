var Queens = function(args) {
	this.white = (args?.white) || [0, 3];
	this.black = (args?.black) || [7, 3];
	if (this.white[0] === this.black[0] && this.white[1] === this.black[1]) {
		throw "Queens cannot share the same space";
	}
};

Queens.prototype.toString = function() {
	const board = Array(8).fill(null).map(() => Array(8).fill("_"));
	board[this.white[0]][this.white[1]] = "W";
	board[this.black[0]][this.black[1]] = "B";
	return board.map(row => row.join(" ")).join("\n") + "\n";
};

Queens.prototype.canAttack = function() {
	const rowDiff = Math.abs(this.black[0] - this.white[0]);
	const colDiff = Math.abs(this.black[1] - this.white[1]);
	return rowDiff === 0 || colDiff === 0 || rowDiff === colDiff;
};

export default Queens;