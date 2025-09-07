var Queens = function(args) {
    this.white = (args && args.white) || [0, 3];
    this.black = (args && args.black) || [7, 3];

    if (this.white[0] === this.black[0] && this.white[1] === this.black[1]) {
        throw "Queens cannot share the same space";
    }
};

Queens.prototype.toString = function() {
    let board = "";
    for (let i = 0; i < 8; i++) {
        let row = "";
        for (let j = 0; j < 8; j++) {
            if (this.white[0] === i && this.white[1] === j) {
                row += "W";
            } else if (this.black[0] === i && this.black[1] === j) {
                row += "B";
            } else {
                row += "_";
            }
            row += " ";
        }
        board += row.trim() + "\n";
    }
    return board;
};


Queens.prototype.canAttack = function() {
    const rowDiff = Math.abs(this.white[0] - this.black[0]);
    const colDiff = Math.abs(this.white[1] - this.black[1]);

    return rowDiff === 0 || colDiff === 0 || rowDiff === colDiff;
};

export default Queens;