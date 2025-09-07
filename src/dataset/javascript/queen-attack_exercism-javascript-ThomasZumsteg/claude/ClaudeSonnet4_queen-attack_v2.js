var Queens = function(args) {
	/* Queens on a chess board */
	this.white = (args && args.white) || [0, 3];
	this.black = (args && args.black) || [7, 3];
	if(this.white[0] === this.black[0] && this.white[1] === this.black[1])
		throw "Queens cannot share the same space";
}

Queens.prototype.toString = function() {
	/* String representation of the chess board */
	var result = "";
	var whiteRow = this.white[0], whiteCol = this.white[1];
	var blackRow = this.black[0], blackCol = this.black[1];
	
	for(var i = 0; i < 8; i++) {
		for(var j = 0; j < 8; j++) {
			if(i === whiteRow && j === whiteCol) {
				result += "W";
			} else if(i === blackRow && j === blackCol) {
				result += "B";
			} else {
				result += "_";
			}
			if(j < 7) result += " ";
		}
		result += "\n";
	}
	return result;
};

Queens.prototype.canAttack = function() {
	/* Can the queens attack eachother */
	var rowDiff = Math.abs(this.black[0] - this.white[0]);
	var colDiff = Math.abs(this.black[1] - this.white[1]);
	return rowDiff === 0 || colDiff === 0 || rowDiff === colDiff;
};

export default Queens;